#!/usr/bin/env node

const fetch = require('node-fetch');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const readline = require('readline');

// Helper function to test if a URL is accessible
async function testChannelUrl(url, timeout = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    clearTimeout(timeoutId);
    // Consider successful if we get any response (including redirects)
    return response.status < 500;
  } catch (error) {
    clearTimeout(timeoutId);
    return false;
  }
}

// Helper function to extract channels from addon.js
function getChannelsFromAddon() {
  const addonContent = readFileSync(join(process.cwd(), 'addon.js'), 'utf-8');
  
  // Extract the canales array using regex
  const canalesMatch = addonContent.match(/const canales = \[([\s\S]*?)\];/);
  if (!canalesMatch) {
    throw new Error('Could not find canales array in addon.js');
  }
  
  // Simple regex to extract channel objects
  const channelRegex = /\{\s*id:\s*['"`]([^'"`]+)['"`],\s*name:\s*['"`]([^'"`]+)['"`],\s*description:\s*['"`]([^'"`]*)['"`],\s*poster:\s*['"`]([^'"`]*)['"`],\s*url:\s*['"`]([^'"`]+)['"`]\s*\}/g;
  
  const channels = [];
  let match;
  
  while ((match = channelRegex.exec(canalesMatch[1])) !== null) {
    channels.push({
      id: match[1],
      name: match[2],
      description: match[3],
      poster: match[4],
      url: match[5]
    });
  }
  
  if (channels.length === 0) {
    console.log('Addon content preview:', addonContent.substring(0, 500));
    throw new Error('Could not parse any channels from addon.js');
  }
  
  return channels;
}

// Main function to clean broken channels
async function cleanBrokenChannels() {
  console.log('🔍 Checking channel availability...\n');
  
  const channels = getChannelsFromAddon();
  const results = [];
  
  for (const channel of channels) {
    process.stdout.write(`Testing ${channel.name}... `);
    const isWorking = await testChannelUrl(channel.url);
    
    if (isWorking) {
      console.log('✅');
      results.push({ channel, working: true });
    } else {
      console.log('❌');
      results.push({ channel, working: false });
    }
  }
  
  const workingChannels = results.filter(r => r.working).map(r => r.channel);
  const brokenChannels = results.filter(r => !r.working).map(r => r.channel);
  
  console.log(`\n📊 Results:`);
  console.log(`   ✅ Working: ${workingChannels.length}`);
  console.log(`   ❌ Broken:  ${brokenChannels.length}`);
  
  if (brokenChannels.length > 0) {
    console.log(`\n❌ Broken channels:`);
    brokenChannels.forEach(channel => {
      console.log(`   - ${channel.name} (${channel.id})`);
    });
    
    const answer = await new Promise(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question('\n🗑️  Remove broken channels? (y/N): ', (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      });
    });
    
    if (answer) {
      // Update addon.js with only working channels
      const addonContent = readFileSync(join(process.cwd(), 'addon.js'), 'utf-8');
      
      // Generate new channels array string
      const newChannelsString = workingChannels.map(channel => {
        return `    {
        id: '${channel.id}',
        name: '${channel.name}',
        description: '${channel.description}',
        poster: '${channel.poster || ''}',
        url: '${channel.url}'
    }`;
      }).join(',\n');
      
      const newContent = addonContent.replace(
        /const canales = \[([\s\S]*?)\];/,
        `const canales = [\n${newChannelsString}\n];`
      );
      
      writeFileSync(join(process.cwd(), 'addon.js'), newContent);
      console.log(`\n✅ Removed ${brokenChannels.length} broken channels from addon.js`);
      console.log(`📝 ${workingChannels.length} working channels remain`);
    } else {
      console.log('\n⏭️  Skipping removal of broken channels');
    }
  } else {
    console.log('\n🎉 All channels are working!');
  }
}

// Run the script
cleanBrokenChannels().catch(console.error);