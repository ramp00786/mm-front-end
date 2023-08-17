// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function  handler(req, res) {
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();
    return ssData;
  }
  