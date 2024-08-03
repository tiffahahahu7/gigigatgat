---
title: "七月｜經驗值進度條逐格前進"
date: 2024-07-27
draft: false
description: "七月小結"
slug: "jul 2024 recap"
tags: ["經驗帖", "博客裝修", "書影音遊"]
categories: ["recap"]
showComments: true
showAuthor: false
authors:
  - "avocado"
---
*<span class="text-sm">Hero Photo by Microsoft Copilot with prompt: "create an image of an XP progress bar in a pixel game with 'Level Up' text."<span>*

{{<alert "circle-info" >}}
本站[RSS](https://www.gigigatgat.ca/index.xml)地址已更新，麻煩讀者朋友們重新訂閱一次喔！
{{</alert>}}

想取這個標題是因為回顧整個月，雖然沒有什麼特別的大事件可以記錄，但確實在不少細碎的小事上逐步積攢了經驗，碎碎念裡的每一件事都能體現出這個特點。這個月也是遊戲玩得特別兇的一個月，很久以前在圖書館預定的switch遊戲剛好都擠在這個時段輪候到了，我玩得也是風生水起，不做正事的愧疚感和遊戲裡的經驗值同時高漲（頭頂鍋蓋）⋯⋯

## 本月碎碎念
### 喜提首張停車罰單
這張罰單收得我措手不及，它控訴我將車停在loading zone，我一開始覺得委屈——我車就停在家門口向前一兩個車位的距離，平時也見過許多車停在同樣的位置。隔壁是有loading zone的牌子，但我停的位置前面還有大把空間，應該不影響loading。但也怪我對parking sign理解不到位，我現在才知道像下圖所示的parking sign，朝左的箭頭標誌其實就代表從這塊牌子開始就是loading zone的起始點，沒有模糊的理解空間。
![parking sign](parking-sign.JPG)
雖然我理虧，我還是在市政府官網提交了review request，聲情並茂地描述了我以為的我的無辜。結果也確實如小紅書經驗帖所說的，75刀的罰單申訴後減免到了35刀，如果不服還可以再上庭對質，但我自知道理不在我這邊，帶著撿了便宜一樣的心態快樂交錢，火速了結了這碼事。
### 重整YNAB使用思路
關於YNAB是什麼可以閱讀友鄰的這篇博客：[记账软件YNAB：为什么它是最强的记账app](https://thirdshire.com/why-ynab-is-the-best/)。之前種草後通過學生身份認證開啟了YNAB的一年試用期，用了半年下來感覺自己的使用方式不是特別對勁。特別是之前的分類思路是類似衣食住行的簡單分法，和對象的雙人開支和個人支出混在同一個大類裡，看報告就依然一頭霧水。這個月索性決定fresh start，將大大小小的分類重新做了調整，新添了Individual和Rewards兩個類別，其餘分類全部視為家庭支出，一下子看著舒爽了很多，又有動力繼續用下去了。
### 開了FHSA account
隨著投資意識的萌芽，加上之前看過友鄰的另一篇博客[加拿大新移民个人理财101](https://yukieyun.net/takeaway/welcome-to-canada-personal-finance-01/)，對幾個免稅儲蓄帳戶已經有所了解，這個月終於行動起來開通了FHSA並存滿了額度——在WealthSimple操作其實也就兩三分鐘的事。FHSA的額度計算比TFSA簡單粗暴許多：從開戶當年算起，每年都有八千的存錢額度，直到存到四萬加幣上限，而帳戶的有效期是自開戶日起15年。如果當年開戶了沒存錢，額度可以累計到下年使用；但如果今年沒開戶，就只能老老實實在開戶那年存滿八千再等下一年擴充額度。天吶我並沒有想在這裡續寫理財101的意圖，就此收手吧！
## 博客更新
### 已發布
- [讀書筆記｜Steal Like An Artist](https://www.gigigatgat.ca/posts/steal-like-an-artist/)：這已經是我第三次在博客裡介紹這本書了——所以我詞窮了，總之五星推薦！是我願意隨時復讀的筆記。
- [讀書筆記｜Show Your Work](https://www.gigigatgat.ca/posts/show-your-work/)：發了這篇文章之後其實忘了在毛象和IG同步更新了，不過也不重要，有緣自會來相見！我察覺到這本書目前對我最明顯的影響是我開始更有意識地——比如在這篇博客裡——分享那些「影響過我的東西」和「我真心欣賞的東西」。如果我自己在做的事還是微不足道，至少這兩種東西是我能夠驕傲地展示出來並希望他人也能看到的。
### 折騰裝修
- **RSS地址更新**：[椒鹽豆豉](https://blog.douchi.space/#gsc.tab=0)老師不指出來我都沒發現，之前更新博客默認語言的設置時也牽扯到了url的變動，所以現在正確的RSS地址是`https://www.gigigatgat.ca/index.xml`，訂閱了舊地址的朋友請務必更新一下喔！
- **Search功能快捷鍵更新**：也是椒老師指出來的bug，原來blowfish這個主題默認按forward slash會跳出搜索界面，在評論區留言時按到這個鍵反而會誤觸。我乾脆把它改成了cmd+f/ctrl+f的國際通用搜索快捷鍵，需要做的只是找到`search.js`文件，將對應的if condition改成`if((event.key === 'f' || event.key === 'F') && (event.metaKey || event.ctrlKey))`。
- **neodb更新個人評分**：這篇博客裡我想推薦的兩本書的neodb條目評分都默認是0，看著過於刺眼，終於行動起來增添個人評分功能。教程來自這篇[博客](https://naturaleki.one/post/loading-hugo-05/#%E5%BC%95%E5%85%A5neodb%E5%8D%A1%E7%89%87)，我不是很熟悉go template的語法，純粹用傻瓜操作複製粘貼替代了`neodb.html`裡的原有代碼就完事了。
## 書影音遊
### 推薦報道
- [三个福建女子，“出来”之后](https://www.chicheng.run/posts/fujian-women-immigration-stories/)：這篇文章最早是4月份發表在端傳媒，我那時已經看得很入迷。作者在搭建個人博客後不僅搬運了這篇報道，還寫了一系列的記者手記，從如何找到這份成為採訪契機的工作到採寫後對故事裡另一個側面的延伸探討，每一篇都非常非常好看。雖然只鏈接了這一篇，但該系列下的每一篇都是我想推薦的。
- [SERRINI專訪 ：「原來我可以令這一代的女孩不需要再後退。」](https://jetmagazine.com.hk/serrini-%E6%B5%B7%E7%8D%BA%E6%8B%94%E6%B2%B3/)：我之前對Serrini的印象可能是「像精靈一樣跳躍的女子」，我知道她是非世俗的，但更多是出於直覺，也說不上個所以然，直到看到這篇專訪才對她有更深入的了解——她比我想像的更通透特別。（突然發現這篇文章的slug被設定為`serrini-海獺拔河`，好可愛！）
- [說起一盤咕咾肉、一杯奶茶的故事，他們要在英國重拾「香港料理」話語權](https://www.twreporter.org/a/hong-kong-food-new-wave-in-uk)：很不好意思地承認報導者大部分的選題我其實不是很感興趣，感覺文章標題經常顯得太過嚴肅。但這篇，可能是因為關於吃，可能是因為關於香港，可能是因為關於移民，我一下子就看進去了。文章的切口選得很有意思：龐大數量的港人移英後，如何在日常飲食的層面重建當地社群文化，如何堅持不同於中國人的身份敘事？文章裡有一段受訪者對韭菜的敘述也很有意思：中國語境下的韭菜永遠是被鐮刀砍的客體，是砍完不長記性接著長的恨鐵不成鋼；但受訪者說香港人也像韭菜，強調的卻是韭菜的主體性，「韭菜是一種堅韌的植物，容易在異地生長，被割斷了還能源源不絕生長」，反而像帶著希望。
### 書籍
{{< neodb "https://neodb.social/book/6khBCWeZiolqeqrU7I3njm" "10">}}
我是先在[YouTube](https://www.youtube.com/@francetvslashstudio/search?query=culott%C3%A9es)和[b站](https://space.bilibili.com/1373195468/channel/collectiondetail?sid=49005)上看了幾集由本書改編的動畫（搜索關鍵詞是Culottées/她們的傳奇），短短三分鐘一集介紹世界歷史裡那些勇敢、堅韌、活出自我色彩的傳奇女性——而我原本不知曉她們的姓名。我能搜到的動畫資源很有限，但我又那麼想了解更多人的故事，好在發現圖書館就有這本書可借。書也是以漫畫的形式呈現她們的人生故事，相比動畫會增添更多細節，我已經決定等家裡的小朋友再長大些就買這本書給她們做啟蒙讀物！

{{< neodb "https://neodb.social/book/1wMqHVgjmmUaq0jxzoEiuh" "9">}}
也是在圖書館借到的這本書——被渥太華圖書館的館藏涉獵之廣震撼到了！要知道這是一本2023年才在台灣出版的繁體竪版書。

書名是香港公屋，其實也是從公屋的角度寫香港歷史。對公屋的了解也是對香港無法被維多利亞港代表的另一面的了解。公屋的起源和制度變遷、公屋代表的身份階層和庶民文化、公屋僵硬的設計套路和夾縫中結合本地個性的嘗試，都可以在這本書中見到細緻的剖解。整本書沒有太強的學究味，比我預期的更好讀，我會推薦給任何想進一步了解真實的香港的人。
### 紀錄片
{{< neodb "https://neodb.social/movie/4ZzdhQ4RkIx7wz79yGpJEW" "8">}}
圖書館尋寶又一驚喜發現，它甚至同時提供DVD和streaming video兩種版本。這部2020年的紀錄片當時美國和日本都有上映，我卻想看沒處看，如今終於一解夙願。Denise Ho: Becoming the Song這個片名也是很貼切，何韻詩一路唱的歌都是對自己的預言，她是我最驕傲的偶像，我是她的千千萬萬分之一。
### 遊戲
{{< neodb "https://neodb.social/game/6pWCVj7QMIKJTo4txjkKuq" "8" >}}
打完一輪拳身體感受是我打出去的拳好像都打在了自己身上⋯⋯不怪得它報告我的身體年齡是37歲（可惡！）。因為是從圖書館借的就主打一個體驗感，也沒有認真堅持下去。
{{< neodb "https://neodb.social/game/02MDdRxqVsEZdB5DY7eM1A" "6" >}}
我玩的第一個寶可夢switch遊戲，有一種莫名其妙的又難玩又好玩的感受。難玩是因為那些對劇情、對交互的批評都是有道理的，我能玩20多個小時可能純粹出自對寶可夢的一腔熱血⋯⋯

除此之外還借了寶可夢紫和塞爾達傳說織夢島，還沒來得及好好玩！