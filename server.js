import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";

const dataReg = new RegExp("[0-9a-f]{64}");

const fsRoot ="public"
Deno.serve({ port: 8080 }, async (req) => {
  const kv = await Deno.openKv();
  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/sales") {
    return await serveFile(req, `${fsRoot}/sales.html`);
  }

  if (req.method === "POST" && pathname === "/api/sell-poteto") {
    const body = await req.json();
    const poteto = body["poteto"];
    if(!dataReg.test(poteto)) {
      return OK();
    }
    const id = ulid();
    kv.set(["potetos",id], poteto);

    return OK();
  }

  if (req.method === "GET" && pathname === "/api/selling-poteto") {
    // return OK();
    const iterator = kv.list({
      prefix: ["potetos"],
    })
    
    const list = [];
    for await (const item of iterator){
      list.push(item.value);
    }

    return resultData(list)
  }

  return serveDir(req, {
    fsRoot: fsRoot,
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});

const OK = () => {
  return new Response(JSON.stringify({status: "ok"}), {
    headers: { 'Content-Type': 'application/json' },
  });
}

const resultData = (data) => {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}