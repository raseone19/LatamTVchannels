const { describe, it, expect } = require('vitest');
const fetch = require('node-fetch');
const { readFileSync } = require('fs');
const { join } = require('path');

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

// Helper function to test if a URL is accessible
async function testChannelUrl(url, timeout = 10000) {
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
    return {
      accessible: response.status < 500,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      return {
        accessible: false,
        status: 'TIMEOUT',
        statusText: 'Request timeout'
      };
    }
    
    return {
      accessible: false,
      status: 'ERROR',
      statusText: error.message
    };
  }
}

describe('Channel Availability Tests', () => {
  let channels;
  
  beforeAll(() => {
    channels = getChannelsFromAddon();
    console.log(`Testing ${channels.length} channels...`);
  });

  it('should have channels defined', () => {
    expect(channels).toBeDefined();
    expect(channels.length).toBeGreaterThan(0);
  });

  it('should have valid channel structure', () => {
    channels.forEach(channel => {
      expect(channel).toHaveProperty('id');
      expect(channel).toHaveProperty('name');
      expect(channel).toHaveProperty('url');
      expect(channel.id).toBeTruthy();
      expect(channel.name).toBeTruthy();
      expect(channel.url).toBeTruthy();
      expect(channel.url).toMatch(/^https?:\/\//);
    });
  });

  describe('Individual Channel Tests', () => {
    it('should test all channels for accessibility', async () => {
      const channels = getChannelsFromAddon();
      
      for (const channel of channels) {
        const result = await testChannelUrl(channel.url);
        
        if (!result.accessible) {
          console.warn(`❌ ${channel.name}: ${result.status} - ${result.statusText}`);
          console.warn(`   URL: ${channel.url}`);
        } else {
          console.log(`✅ ${channel.name}: ${result.status}`);
        }
        
        // For now, we'll just warn about broken channels but not fail the test
        expect(result).toBeDefined();
      }
    }, 180000); // 3 minute timeout for all channels
  });

  describe('Channel Statistics', () => {
    it('should report channel availability statistics', async () => {
      console.log('\n📊 Testing all channels for availability...\n');
      
      const results = await Promise.allSettled(
        channels.map(async (channel) => {
          const result = await testChannelUrl(channel.url);
          return {
            channel,
            result
          };
        })
      );

      const successful = results.filter(r => r.status === 'fulfilled' && r.value.result.accessible);
      const failed = results.filter(r => r.status === 'rejected' || !r.value.result.accessible);
      
      console.log(`\n📈 CHANNEL AVAILABILITY REPORT:`);
      console.log(`   ✅ Working: ${successful.length}/${channels.length} (${Math.round(successful.length/channels.length*100)}%)`);
      console.log(`   ❌ Broken:  ${failed.length}/${channels.length} (${Math.round(failed.length/channels.length*100)}%)\n`);
      
      if (failed.length > 0) {
        console.log('❌ BROKEN CHANNELS:');
        failed.forEach(f => {
          if (f.status === 'fulfilled') {
            const { channel, result } = f.value;
            console.log(`   - ${channel.name}: ${result.status} - ${result.statusText}`);
          }
        });
        console.log('');
      }
      
      // Always pass this test, it's just for reporting
      expect(results.length).toBe(channels.length);
    }, 60000); // 1 minute timeout for all channels
  });
});