
# 概要

このリポジトリは、川崎市中原区で活動するサッカーチームFC中原のホームページを管理しています。

# 構成

基本的に、[index.html](public/index.html) の１ページです。

cssはBootstrapをベースにしており、無料テンプレート（oneoder/）を改良して作っています。

index.htmlに含まれているリンクは、主に

1. 各学年の主な戦績 => 必要に応じてホームページ係が更新
2. 各学年の各年度の試合結果 => 各学年で試合結果ページを用意。URLをホームページ係へ連絡。
3. スケジュール（Googleドキュメント、月ごと） =>　毎月ホームページ係が用意。内容は随時更新。
4. チーム規約（Googleドキュメント）
5. 入部届（Googleドキュメント）
6. SNS（FacebookやInstagram）

となっており、1については毎年、2については毎月更新する必要があります。

# 運用サーバ

サーバには[Firebase](https://firebase.google.com)の無料枠を利用しています。

リポジトリ内のファイルを変更すると、GitHub ActionというCIサービスが検知し、
[firebase_deploy.yml](.github/workflows/firebase_deploy.yml)
に記載されているように、Firebaseのサーバのファイルを自動的に更新する設定になっています。

# index.htmlの更新

- WebブラウザでGitHub上の本リポジトリのファイルを更新する（自動でサーバに反映される）
- Gitでローカルに一度pullし、編集しpushする。（gitコマンドの利用が必要）

のどちらかをやれば良い。

GitHubのリポジトリは編集権限が必要なので、編集する場合には管理者に問い合わせる必要がある。（要GitHubアカウント）

各学年の主な戦績（優勝等）は、必要があれば修正内容をホームページ係へ連絡する。

# 各学年の試合結果

各学年で、試合結果のページをGoogleドキュメント等で用意し、作成したページのURLをホームページ係へ連絡し、index.htmlに記載する。

# 問い合わせフォーム

FirebaseのCloudFunctionsを利用して、サーバレス構成で問い合わせフォームを実現している。

index.htmlから問い合わせボタンを押すと、メール送信関数（実際にはURL）が送信され、メール送信プログラムが動き、メールが送信される。

# ドメインに関して

[Firebaseでのドメイン設定方法](https://qiita.com/yacchi1123/items/963bdf12c9c4a7a8f67c)

[お名前.com](https://www.onamae.com)

fcnakahara.netをお名前.comで購入し、firebaseに設定済み。

# 注意
