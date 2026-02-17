const STINSON_MEDIA_SEGMENT = "/stinson/home/";

export function resolveStinsonMediaSrc(source?: string) {
  if (!source) {
    return "";
  }

  if (source.startsWith("/uploads/stinson/home/") || source.startsWith("data:")) {
    return source;
  }

  if (source.startsWith("/")) {
    return source;
  }

  try {
    const url = new URL(source);
    const segmentIndex = url.pathname.indexOf(STINSON_MEDIA_SEGMENT);

    if (segmentIndex === -1) {
      return source;
    }

    return `/uploads${url.pathname.slice(segmentIndex)}`;
  } catch {
    return source;
  }
}
