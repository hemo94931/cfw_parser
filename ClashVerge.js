// 国内DNS服务器
const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query", // 腾讯DNSPod
    "https://doh.360.cn/dns-query" // 360安全DNS
  ];
  // 国外DNS服务器
  const foreignNameservers = [
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://1.0.0.1/dns-query", // Cloudflare(备)
    "https://208.67.222.222/dns-query", // OpenDNS(主)
    "https://208.67.220.220/dns-query", // OpenDNS(备)
    "https://194.242.2.2/dns-query", // Mullvad(主)
    "https://194.242.2.3/dns-query" // Mullvad(备)
  ];
  // DNS配置
  const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
      // 本地主机/设备
      "+.lan",
      "+.local",
      // Windows网络出现小地球图标
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      // QQ快速登录检测失败
      "localhost.ptlogin2.qq.com",
      "localhost.sec.qq.com",
      // 微信快速登录检测失败
      "localhost.work.weixin.qq.com"
    ],
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
    "nameserver": [...domesticNameservers, ...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
      "geosite:private,cn,geolocation-cn": domesticNameservers,
      "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
  };
  // 规则集通用配置
  const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
  };
  // 规则集配置
  const ruleProviders = {
    "reject": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      "path": "./ruleset/loyalsoldier/reject.yaml"
    },
    "icloud": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
      "path": "./ruleset/loyalsoldier/icloud.yaml"
    },
    "apple": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
      "path": "./ruleset/loyalsoldier/apple.yaml"
    },
    "google": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
      "path": "./ruleset/loyalsoldier/google.yaml"
    },
    "proxy": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      "path": "./ruleset/loyalsoldier/proxy.yaml"
    },
    "direct": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      "path": "./ruleset/loyalsoldier/direct.yaml"
    },
    "private": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
      "path": "./ruleset/loyalsoldier/private.yaml"
    },
    "gfw": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      "path": "./ruleset/loyalsoldier/gfw.yaml"
    },
    "tld-not-cn": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
    },
    "telegramcidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
    },
    "cncidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    "lancidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
      "path": "./ruleset/loyalsoldier/lancidr.yaml"
    },
    "applications": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    "openai": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
      "path": "./ruleset/blackmatrix7/openai.yaml"
    },
    "claude": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ericz15/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
      "path": "./ruleset/blackmatrix7/claude.yaml"
    },
    "github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub.yaml",
      "path": "./ruleset/blackmatrix7/claude.yaml"
    }
  
  };
  // 规则
  const rules = [
    // 自定义规则
    "DOMAIN-SUFFIX,googleapis.cn,Select", // Google服务
    "DOMAIN-SUFFIX,gstatic.com,Select", // Google静态资源
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,Select", // Google Play下载服务
    "DOMAIN-SUFFIX,github.io,Select", // Github Pages
    "DOMAIN,v2rayse.com,Select", // V2rayse节点工具
    // blackmatrix7 规则集
    "RULE-SET,openai,ChatGPT",
    "RULE-SET,claude,Claude",
    "RULE-SET,github,Github",
    // Loyalsoldier 规则集
    "RULE-SET,applications,Direct",
    "RULE-SET,private,Direct",
    "RULE-SET,reject,AD Guard",
    "RULE-SET,icloud,Microsoft",
    "RULE-SET,apple,Apple",
    "RULE-SET,google,Google",
    "RULE-SET,proxy,Select",
    "RULE-SET,gfw,Select",
    "RULE-SET,tld-not-cn,Select",
    "RULE-SET,direct,Direct",
    "RULE-SET,lancidr,Direct,no-resolve",
    "RULE-SET,cncidr,Direct,no-resolve",
    "RULE-SET,telegramcidr,Telegram,no-resolve",
    // 其他规则
    "GEOIP,LAN,Direct,no-resolve",
    "GEOIP,CN,Direct,no-resolve",
    "MATCH,Proxy"
  ];
  // 代理组通用配置
  const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
  };
  // 代理组
  const proxyGroups = [
    {
      ...groupBaseOption,
      "name": "Select",
      "type": "select",
      "proxies": ["Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "Url-test",
      "type": "url-test",
      "tolerance": 100,
      "proxies": ["HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "Fallback",
      "type": "fallback",
      "proxies": ["HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "Load-balance(Hash)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "proxies": ["HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "Load-balance(RR)",
      "type": "load-balance",
      "strategy": "round-robin",
      "proxies": ["HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      // "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "Github",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/github.svg"
    },
    {
      ...groupBaseOption,
      "name": "Youtube",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "url": "https://chatgpt.com",
      "expected-status": "200",
      "name": "ChatGPT",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "url": "https://claude.ai",
      "expected-status": "200",
      "name": "Claude",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
    },
    {
      ...groupBaseOption,
      "name": "Microsoft",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "Apple",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "AD Guard",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "Direct",
      "type": "select",
      "proxies": ["DIRECT", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "Reject",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "Proxy",
      "type": "select",
      "proxies": ["Select", "Url-test", "Fallback", "Load-balance(Hash)", "Load-balance(RR)", "Direct", "HK香港", "TW台湾", "JP日本", "SG新加坡", "KR韩国", "US美国", "其他"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    },
    {
      ...groupBaseOption,
      "name": "HK香港",
      "type": "url-test",
      "include-all": true,
      "filter": "港|香港|🇭🇰|HK|Hong Kong"
    },
    {
      ...groupBaseOption,
      "name": "TW台湾",
      "type": "url-test",
      "include-all": true,
      "filter": "台|台湾|新北|彰化|TW|Taiwan"
    },
    {
      ...groupBaseOption,
      "name": "JP日本",
      "type": "url-test",
      "include-all": true,
      "filter": "日|日本|🇯🇵|川日|东京|大阪|泉日|埼玉|沪日|深日|[^-]日|JP|Japan"
    },
    {
      ...groupBaseOption,
      "name": "KR韩国",
      "type": "url-test",
      "include-all": true,
      "filter": "韩|韓|韩国|🇰🇷|KR|Korea|KOR|首尔"
    },
    {
      ...groupBaseOption,
      "name": "SG新加坡",
      "type": "url-test",
      "include-all": true,
      "filter": "新加坡|🇸🇬|坡|狮城|SG|Singapore"
    },
    {
      ...groupBaseOption,
      "name": "US美国",
      "type": "url-test",
      "include-all": true,
      "filter": "美|美国|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States"
    },
    {
      ...groupBaseOption,
      "name": "其他",
      "type": "url-test",
      "include-all": true,
      "filter": "^[^香日台新韩美]*$"
    }
  ];
  
  // 程序入口
  function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
      typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
      throw new Error("配置文件中未找到任何代理");
    }
  
    // 覆盖原配置中DNS配置
    config["dns"] = dnsConfig;
  
    // 覆盖原配置中的代理组
    config["proxy-groups"] = proxyGroups;
  
    // 覆盖原配置中的规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;
  
    // 返回修改后的配置
    return config;
  }