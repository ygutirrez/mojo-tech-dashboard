// MoJo Marketing Dashboard - Data Refresh Script
// Run this to pull fresh data and update the dashboard

import fs from 'fs';
import https from 'https';

const META_TOKEN_PATH = '/Users/ygutierrez/.clawdbot/secrets/meta-ads-token.txt';
const GOOGLE_SHEET_ID = '1Re-c3B7Zy2LYl6SujBNrk-_1Owc_NrwYB0uQgoC0J4E';
const DASHBOARD_PATH = '/Users/ygutierrez/clawd/projects/mojo-dashboard/dashboard-data.json';

// Date range mappings
const DATE_RANGES = {
  '7': { meta: 'last_7d', google: 'Last 7 Days' },
  '14': { meta: 'last_14d', google: 'Last 14 Days' },
  '30': { meta: 'last_30d', google: 'Last 30 Days' },
  '90': { meta: 'last_90d', google: 'Last 90 Days' },
  'ytd': { meta: 'this_year', google: 'This Year' }
};

async function fetchMeta(datePreset) {
  const token = fs.readFileSync(META_TOKEN_PATH, 'utf8').trim();
  const url = `https://graph.facebook.com/v18.0/act_1649810245121714/campaigns?fields=name,status,insights.date_preset(${datePreset}){spend,impressions,clicks,cpc,ctr,reach}&limit=50&access_token=${token}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const campaigns = (json.data || []).map(c => ({
            name: c.name,
            status: c.status,
            spend: c.insights?.data?.[0]?.spend || 0,
            impressions: c.insights?.data?.[0]?.impressions || 0,
            clicks: c.insights?.data?.[0]?.clicks || 0,
            cpc: c.insights?.data?.[0]?.cpc || 0,
            ctr: c.insights?.data?.[0]?.ctr || '0%'
          }));
          resolve(campaigns);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function fetchGoogle(sheetName) {
  // For now, return placeholder - Google Sheets API needs OAuth
  // The data comes from the Google Ads script export
  return [
    { name: 'Misting system F', status: 'enabled', spend: 1840.02, impressions: 2010601, clicks: 19052, conversions: 18383 },
    { name: 'PMax: Local Ad', status: 'enabled', spend: 437.69, impressions: 506277, clicks: 709, conversions: 3 },
    { name: 'LeadGen-Search', status: 'enabled', spend: 1751.03, impressions: 1897, clicks: 187, conversions: 28 },
    { name: 'Lead Gen-Performance', status: 'enabled', spend: 1265.49, impressions: 184107, clicks: 1725, conversions: 8 },
    { name: 'YouTube Video', status: 'enabled', spend: 150.05, impressions: 32206, clicks: 167, conversions: 0 },
    { name: 'Vince Youtube', status: 'enabled', spend: 819.44, impressions: 56012, clicks: 3281, conversions: 0 }
  ];
}

async function refreshAll() {
  console.log('Refreshing dashboard data...');
  
  const data = {
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    ranges: {}
  };
  
  for (const [key, range] of Object.entries(DATE_RANGES)) {
    console.log(`Fetching ${key} days...`);
    
    const metaCampaigns = await fetchMeta(range.meta);
    const googleCampaigns = await fetchGoogle(range.google);
    
    data.ranges[key] = {
      meta: {
        campaigns: metaCampaigns,
        totalSpend: metaCampaigns.reduce((sum, c) => sum + parseFloat(c.spend || 0), 0)
      },
      google: {
        campaigns: googleCampaigns,
        totalSpend: googleCampaigns.reduce((sum, c) => sum + parseFloat(c.spend || 0), 0)
      }
    };
  }
  
  fs.writeFileSync(DASHBOARD_PATH, JSON.stringify(data, null, 2));
  console.log('Dashboard data saved to:', DASHBOARD_PATH);
  console.log('Done!');
}

refreshAll().catch(console.error);
