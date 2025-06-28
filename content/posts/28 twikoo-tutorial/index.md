---
title: "Twikoo評論系統的個性化設置"
date: 2024-08-03
draft: false
description: "如何修改wikoo評論區頭像及添加自定義表情包"
slug: "twikoo-tutorial"
featureimage: "https://images.gigigatgat.ca/20240803-cover.jpg"
tags: ["博客裝修", "tutorial"]
categories: ["tech"]
showComments: true
showAuthor: false
authors:
  - "avocado"
---
Twikoo評論系統確實簡潔易用，使用了四個多月下來整體都很滿意。本文主要記錄了些關於**定制化設置**一些參數或功能的心得，希望對其他人也有所幫助！

（關於如何添加/遷移Twikoo評論系統請參考[往期文章](https://www.gigigatgat.ca/posts/apr-2024-recap/#%E6%8A%98%E9%A8%B0%E8%A3%9D%E4%BF%AE)提到的reference。）
## 頭像設置
### 個人頭像綁定
我記得我一開始給別人留言時，首先冒出的問題是——為什麼有的人可以自定義頭像而我無論如何都找不到編輯入口？後來忍不住問了椒老師，得到的答覆是可以使用[Gravatar](https://gravatar.com/)這個網站註冊賬號並上傳頭像。**帳號註冊的郵箱必須與評論區留言輸入的郵箱一致**，這個網站的功能就是將你的郵箱地址和profile avatar深度綁定，走哪帶到哪。中國有一個近乎鏡像的服務叫cravatar.cn，它也是Twikoo評論管理系統裡`Configuration-General-GRAVATAR_CDN`一欄的默認參數，強烈建議博主們將其修改為`gravatar.com`。
### 隨機頭像庫
這一點比較基礎，在評論管理系統`Configuration-General-DEFAULT_GRAVATAR`一欄已經可以看到提示的八種選擇，我之前會在google images search對應關鍵詞看大概樣式，後來在stack overflow看到了[@bw1024](https://stackoverflow.com/users/997808/bw1024)一組比較完整的解釋：

> - 404: do not load any image if none is associated with the email hash, instead return an HTTP 404 (File Not Found) response
> - mp: (mystery-person) a simple, cartoon-style silhouetted outline of a person (does not vary by email hash)
> - identicon: a geometric pattern based on an email hash
> - monsterid: a generated 'monster' with different colors, faces, etc
> - wavatar: generated faces with differing features and backgrounds
> - retro: awesome generated, 8-bit arcade-style pixelated faces
> - robohash: a generated robot with different colors, faces, etc
> - blank: a transparent PNG image (border added to HTML below for demonstration purposes)
## 自定義表情包
Twikoo原生的表情包文件是`https://owo.imaegoo.com/owo.json`，顏文字和emoji就算了，bilibili小電視真的讓人兩眼一黑。我前兩天看到[A Purrception](https://tortie.me/)的評論區表情包都是自定義的，非常可愛！立刻決心向她看齊，琢磨上了怎麼實現這個設置。經過一些盲人摸象的曲折探索，我也終於成功改造了自己的表情包庫：

![twikoo emoji screenshot](https://images.gigigatgat.ca/20240803-twikoo-emoji.jpg)

想要**一步到位**的朋友可以直接在評論管理系統`Configuration-Plugin-EMOTION_CDN`一欄輸入`https://raw.githubusercontent.com/avocadoTiff/twikoo/main/owo.json`，等於是複製粘貼了我目前的表情包設定。

想要進一步自定義的可以參考以下我的實踐步驟：
### 搜索目標表情包及其URL
我一開始想要一步到位，直接搜索符合目標表情包和owo格式要求的json file，寄希望於茫茫互聯網已經有人為我整理好了完善的文件——也確實有，像這個[github repo](https://github.com/2X-ercha/Twikoo-Magic)就針對twikoo提供了一系列表情包，但大部分都是我完全接受不了的風格⋯⋯我最後只從這個庫裡抄了Yurui-Neko的表情包，blobcat的表情包是我從[Slackmojis](https://slackmojis.com/categories/25-blob-cats-emojis)自己一個個精挑細選出來的，因為已經提供了alt text並且能右鍵直接複製圖片URL，已經算是比較方便。

天哪在寫這一段時我又發現了這個[網址](https://emotion.xiaokang.me/#/emotion/blob)，那一切就更簡單了！喜歡blob的朋友可以直接點擊twikoo複製整個json file供下一步使用了。我之前訪問這個地址時點首頁的分類卡片都沒反應我就棄了，原來表情包都藏在「所有途徑」這個下拉列表裡= =
### 編輯`owo.json`文件
在`assets/js`文件夾裡新建`owo.json`文件，基本格式如下：

```jsx
{
    "Blobcat": {
      "type": "image",
      "container": [
        { "icon": "<img src=\"https://emojis.slackmojis.com/emojis/images/1643515456/14767/meow_adorable.png?1643515456\">", "text": "meow_adorable" },
        { "icon": "<img src=\"https://emojis.slackmojis.com/emojis/images/1643515237/12549/meow_angel.png?1643515237\">", "text": "meow_angel" }
      ]
    },
    "颜文字": {
      "type": "emoticon",
      "container": [
        { "icon": "OωO", "text": "Author: DIYgod" },
        { "icon": "|´・ω・)ノ", "text": "Hi" },
        { "icon": "ヾ(≧∇≦*)ゝ", "text": "开心" }
      ]
    },
    "Emoji": {
      "type": "emoji",
      "container": [
        { "icon": "😀", "text": "" },
        { "icon": "😅", "text": "" }
      ]
    }
  }
```

在此基礎上對表情包刪刪改改就行了。建議將每個系列的表情包長度控制在三四十個以內就好，太多選擇既無謂又影響加載速度。如果沒有接觸過json語法的話，可以搜一個JSON Formatter & Validator來確認或者直接丟給chatGPT勘誤。
### 修改css
如果不修改css，像blobcat這樣以圖片格式出現的表情包就會是單獨佔整行的block element，很影響使用體驗。我在`assets/css/custom.css`（具體地址和文件可能因主題不同有所區別）裡添加了如下代碼就解決了：
```jsx
.tk-content img, .tk-preview-container img {
    display: inline;
    vertical-align: bottom !important;
}
```
### 上傳並設置Emoji CDN
我下意識將該文件儲存在博客源文件夾裡並同步到github了，其實可以將該文件存儲在任何地方，新建一個github repo單獨上傳該文件或者上傳到其它你偏好的服務器都行。最後在評論管理系統`Configuration-Plugin-EMOTION_CDN`一欄輸入對應的地址就完成啦！

## 彩蛋

與正文無關但是很想興奮地宣告全世界：我也更新了[友情鏈接]({{< relref "friends" >}})的頁面佈局，洋洋自得中！