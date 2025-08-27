import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";

Deno.serve({ port: 8080 }, async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});