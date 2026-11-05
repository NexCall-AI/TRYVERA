module.exports={async rewrites(){return[{source:"/",destination:"/landing.html"}]},
async headers(){return[{source:"/(.*)",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"Permissions-Policy",value:"camera=(self)"}]}]}};
