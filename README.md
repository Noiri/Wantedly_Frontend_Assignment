# 動作確認
## ページ遷移
![動作確認_ページ遷移](https://user-images.githubusercontent.com/33705786/125255436-63616b00-e336-11eb-9857-c42c748a98ca.gif)
## 募集の検索機能
![動作確認_検索機能](https://user-images.githubusercontent.com/33705786/125255467-6d836980-e336-11eb-8a78-1f7ebf3f0a18.gif)

# 仕様について
## フォルダ構成
## ルーティング
- `/`へアクセスすると、`/projects`へリダイレクトされます。
- `/projects/:id`へアクセスすると募集詳細ページへ遷移します。idが存在しないときはNotFoundPageを返すようにしています。
- 存在しないpathへアクセスするとNotFoundPageが表示されます。
