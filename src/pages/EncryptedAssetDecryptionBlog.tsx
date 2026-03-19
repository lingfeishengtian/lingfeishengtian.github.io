import { useEffect, useState } from 'react';
import GithubMarkdownSection from '../components/GithubMarkdownSection';

const repoUrl = 'https://github.com/lingfeishengtian/EncryptedAssetDecryptionExample';
const readmeRawUrl = 'https://raw.githubusercontent.com/lingfeishengtian/EncryptedAssetDecryptionExample/main/README.md';

const EncryptedAssetDecryptionBlog = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(readmeRawUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch README');
        return res.text();
      })
      .then(setMarkdown)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Encrypted Asset Decryption Example
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          A technical deep dive into the <a href={repoUrl} className="text-blue-400 underline">EncryptedAssetDecryptionExample</a> iOS project, covering reverse engineering, asset decryption, and runtime analysis.
        </p>
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <GithubMarkdownSection
            title="EncryptedAssetDecryptionExample"
            url={repoUrl}
            description="Reverse engineering, asset decryption, and runtime analysis of an iOS app with encrypted assets."
            markdown={markdown}
            wikiBaseUrl={repoUrl}
            relativePathBaseUrl="https://raw.githubusercontent.com/lingfeishengtian/EncryptedAssetDecryptionExample/main/"
          />
        )}
      </div>
    </div>
  );
};

export default EncryptedAssetDecryptionBlog;
