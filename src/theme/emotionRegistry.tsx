'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './emotionCache';
import createEmotionServer from '@emotion/server/create-instance';

export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => createEmotionCache());

  useServerInsertedHTML(() => {
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);

    const chunks = extractCriticalToChunks(cache.sheet.tags.join(''));
    const styles = constructStyleTagsFromChunks(chunks);
    return (
      <style dangerouslySetInnerHTML={{ __html: styles }} data-emotion="css" />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
