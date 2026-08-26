MIトラスト Webサイト / GitHub + Vercel 配置手順

以下5ファイルを、Vercelが参照しているGitHubリポジトリの「ルート階層」に配置してください。

index.html
about.html
privacy.html
vercel.json
README_GITHUB_VERCEL.txt（この説明ファイル。公開には不要）

重要:
- about.html を置くだけでは、Vercel上の /about は自動では about.html に解決されない構成があります。
- vercel.json の rewrite により、/about → /about.html、/privacy → /privacy.html を内部的に割り当てます。
- index.html 内のリンクは /about と /privacy のままで問題ありません。
- GitHubへcommit/push後、VercelのDeploymentが完了してから確認してください。

確認URL:
https://www.mi-trust.net/about
https://www.mi-trust.net/privacy
