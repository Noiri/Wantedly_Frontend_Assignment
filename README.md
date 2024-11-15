# 動作確認
## 起動方法
```
yarn run start
```
**注意: localhost:4000でGraphQLサーバーが起動していることを前提としています.**
## ページ遷移
![動作確認_ページ遷移](https://user-images.githubusercontent.com/33705786/125283816-ba296d80-e353-11eb-8377-652ea9ab400a.gif)
## 募集の検索機能
![動作確認_検索機能](https://user-images.githubusercontent.com/33705786/125255467-6d836980-e336-11eb-8a78-1f7ebf3f0a18.gif)

# 仕様について
## アプリの構成
- `index.tsx`: BrowserRouter, Appを配置
- `App.tsx`: 主にルーティング設定を記述
- `ProjectList`: `/projects`に関係するコンポーネント群
- `Project`: `/projects/:id`に関係するコンポーネント群
- `Header`: `/projects`に描画される上部ヘッダー及び検索欄
- `NotFound`: 存在しないpathへアクセスしたときに返すコンポーネント
- `DataType`: 主にServerに問い合わせたときに返ってくるレスポンスの型を提供
- `CustomHooks`: Serverへ問い合わせる関数、募集を絞り込む関数を提供
- `CSS`: コンポーネントへ当てるCSSを提供
## ルーティング
- `/`へアクセスすると、`/projects`へリダイレクトされます。
- `/projects/:id`へアクセスすると募集詳細ページへ遷移します。idが存在しないときはNotFoundPageを返すようにしています。
- 存在しないpathへアクセスするとNotFoundPageが表示されます。

# 工夫した点
## 開発手法
- `eslint`, `prettier`を使用することでコードスタイルを統一しました。(eslintのルールはairbnbのものに従っています.)
- 出来る限り、branchを切って機能ごとに実装していきました.mergeは、都度pull reqestを出して行っていました。
- スタイルを`.ts`ファイルに書いて、`CSS`フォルダに切り分けて置きました。
- 役割ごとにコンポーネントを切り分けたり、CustomHooksを利用することで、コンポーネントごとのコード量を減らし、可読性やメンテナンスしやすいように心がけました。

## UX
- 見た目は、`material-ui`を使用して実装しました。
### /Project
- 検索欄を募集リストとずらして右上に配置しました。これは、「検索欄は右上にあることが多いのでユーザが慣れていそう」、「リストと同じところに並んでいると誤クリックしてしまいそう」だと考えたためです。
- 検索欄を目立たせるためにヘッダーを設置して発見しやすいようにしました。
- 検索を「検索欄でEnter」、「検索ボタン」の2種類で出来るようにしました。これは、こういった入力をする場面では「Enterを押したい人」、「ボタンを押したい人」の2種類存在すると私個人が考えているからです。  
また、検索ボタンは、そこそこ目立つので、右上へ配置することで検索欄の存在に気づいてくれやすいのではないかとというのも理由です。
- ユーザがクリックしやすいように、各募集の全体をクリックできるようにしました。
- ユーザがどの募集にカーソルを乗せているか、わかりやすいようにカーソルを乗せた際に強調するようにしました。
- 検索は、部分一致で実装しました。また、大文字小文字の一致を気にするのはユーザからすると少々面倒なので、大文字小文字の区別をなくしました。(ex: web, Web のどちらでもマッチします.)
- 検索欄に空文字列を入力して検索を行った際には、検索リストの全体を表示するようにしました。また、初回リロード時に募集リストをメモしているため、検索を行って募集を絞り込んだりしてもサーバーへリクエストを送りません。よって、高速に募集の絞り込みを行うことができます。
### /Project/:id
- プロジェクト画像が大きくて読み込みが遅いと考えたので、画像をpreloadするようにしました。
