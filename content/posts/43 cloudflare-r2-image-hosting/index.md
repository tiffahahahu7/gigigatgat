---
title: "（試圖）一勞永逸的博客圖片管理解決方案"
date: 2025-03-07
draft: false
description: "利用Cloudflare R2設置博客圖床的教程，通過自定義腳本、sharp和wrangler工具進行本地圖片優化和自動上傳"
slug: "cloudflare-r2-image-hosting"
featureimage: "https://images.gigigatgat.ca/20250307-cover.jpg"
tags: ["blog", "coding", "tutorial"]
categories: ["tech"]
showComments: true
showAuthor: false
authors:
  - "avocado"
---

剛起完這個牛逼哄哄的標題就有點後悔，我折騰了很久才解決的事重新梳理起來根本沒有那麼複雜，在旁人看來也許是很簡單的事也許有更好的做法，但還是決定硬著頭皮寫下來。如果困擾過我那也有可能困擾其他人，留個記錄總沒錯。

說來慚愧，靜態博客上線500天了（是的我掐著天數發送的！撒花🎉），我到最近才意識到圖床的必要性。這一年多我都在薅GitHub Pages的默認存儲空間，但官方的容量限制建議是每個repo 1GB，每個文件大小上限为 100MB——我現在才明白我用的hugo blowfish主題在預處理圖片這件事上幫了我多大忙，否則按每篇博客至少配一張頭圖的速度我怎麼能堅持到今天，而且很多時候一張圖片本身的大小就超上限了。我明白依靠主題自帶的圖片優化功能不是長久之計，是時候幫圖片們搬個新家了！
## 為什麼選擇Cloudflare R2
圖片優化和圖床管理的工具和平台一抓一大把，我一開始就陷入了選擇困難。還好我這個人有幾條基本原則：**能不註冊新帳號就不註冊新帳號；提供足夠存儲空間的免費額度，能不花錢就不花錢；穩定可靠安全，信得過。** 在這些條件的篩選下，我看中了cloudflare R2 storage。剛好前陣子基於網站性能和安全性的考量我已經把博客域名重新配置到cloudflare，等於這已經是一個我在使用的平台，滿足我心裡的加分項。再加上cloudflare R2的免費額度是每月10GB，慷慨到我不可能用得完。我還提前搜了搜相關的配置教程，看起來相當簡單，於是就決定是它了！
## 我兜過的圈和踩過的坑
進入正題之前有些不吐不快的槽，心急的朋友可以直接跳到[下一節](#方案概述)。

我試過直接google search「cloudflare r2 圖床」，搜索結果第一頁的每篇文章都在要求我在「R2.dev subdomain」這個選項上設置「允許訪問」，說只有這麼做才能真正獲取圖片公共鏈接——才不是這樣呢！我在設置頁看到「When you enable r2.dev access, ..., However, usage is rate-limited and is not recommended for production」的補充說明時已經開始疑惑，怎麼回事呢，如果不建議為什麼中文資源裡到處都說要用呢？其實cloudflare在[Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/)這個官方文檔的開頭就說得很清楚：

> Public buckets can be set up in either one of two ways:
> - Expose your bucket as a custom domain under your control.
> - Expose your bucket as a Cloudflare-managed subdomain under `https://r2.dev`.

（而中文搜索結果裡到處都說要設置R2.dev subdomain只是因為它們都在搬運、洗稿同一篇博客。）

我自己也走了很長的一條彎路。我聽信了上述的說法，又不願意直接照做，開始琢磨起cloudflare Worker搭配R2 bucket的方式，先費勁巴拉學習了worker是什麼，在worker code怎麼寫這個問題上又浪費了好多好多時間，最後疲憊又無奈地向設置公開訪問的教程屈服——毫不意外地成功了但我並不開心。第二天我心一橫又把「R2.dev subdomain」disable了，只留著自定義域名綁定不變，結果依然能直接訪問圖片鏈接！感情我費了老大勁測試的worker code並不發揮實際作用，當下就覺得一片大好光陰被辜負了⋯⋯

我想用Worker的另一個原因是建立第一個bucket後看到的界面提示：「Files larger than 300 MB can be uploaded using the S3 Compatibility API or Workers」。我心想圖片大小超過300MB應該很容易吧，我又不熟悉S3 API，Workers作為cloudflare內置功能應該很容易上手。我錯了。不知道哪裡出了問題，用worker上傳圖片到R2 bucket的過程並不順利，就算跟足了教程和chatGPT老師的指導我還是屢屢失敗，明明http request的response是200，卻找不到圖片被傳去了哪裡。而最後我也發現，預先壓縮圖片後每張圖的大小基本都不會超過1MB，我何必瞎操這個心呢！。
## 方案概述
### 訴求和解法
簡單介紹下我對這個圖片管理方案的期待和幾經周折後確定的核心解決思路：
- **圖床管理：** 需要獲取圖片公共鏈接作為博客圖片source，用Cloudflare R2 bucket綁定custom domain實現。
- **圖片預處理：** 主要是壓縮和格式轉換，尤其是把iphone截圖默認的heic格式轉換為jpg——自從我發現直接改圖片格式後綴在博客裡會顯示出錯之後我都是手動用PS重新導出的⋯⋯（說出來都覺得丟人！）在chatGPT老師的分析和幫助下我選擇了輕量級的[Sharp](https://sharp.pixelplumbing.com/)作為圖片處理工具，並寫了個自動優化文件夾內所有圖片的script，只需要運行一行command就可以批量轉換並導出圖片。
- **多圖片一鍵上傳：** 雖說R2 Dashboard也可以直接拖拽上傳，但圖片數量一多始終不方便。我粗淺地看過兩眼PicGo和它的升級版PicList，覺得沒有吸引我非下載不可的突出優勢。這時我發現用Wrangler（cloudflare官方的CLI工具）就可以輕鬆上傳文件到R2 bucket，於是又和chatGPT老師聯手(?)寫了個automation script實現這個訴求，還增加了已上傳圖片的刪除和存檔功能，又是一行command一個回車解決的事。

當一切都配置妥當之後，我現在只需要把原圖丟進input文件夾，在terminal裡run `node sharp-script.js`優化圖片，再run `node upload-images.js`就可以把所有圖片同步至R2 bucket。這個教程裡為了方便說明拆解了這兩步，其實這兩個script也完全可以結合在一起運作，進一步簡化流程。
### 準備條件
- 一顆勇於面對CLI (Command Line Interface)的心
- cloudflare帳號，博客域名已通過cloudflare DNS解析
- node/npm
## 具體步驟
### 1. 新建並設置R2 bucket
- 登錄Cloudflare dashboard，頁面左側下滑可以找到R2 Object Storage選項，點擊後選擇Create Bucket。初次訪問需要輸入信用卡信息但只有使用超額（超過每月10GB）才會收錢。
- 根據Settings-Public access的路徑找到「connect domain」選項並輸入**自定義的博客子域名**。比如我的博客域名是gigigatgat.ca，我取的子域名就是images.gigigatgat.ca。這個子域名本身是無法訪問的，因為它只用於host其中存儲的文件。
![R2 Screenshot1](https://images.gigigatgat.ca/20250307-screenshot1.jpg)
- 測試：隨便上傳張圖，點進圖片詳情後會看到URLs-Custom Domains下方已經顯示了圖片鏈接，或者不需要點進去也可以通過`<custom domain>/<image.jpg>`的格式直接查看圖片是否已經可以通過鏈接顯示。
### 2. 圖片優化處理-Sharp
- 假設我們想用`cf-images`這個文件夾專門用於存儲博客圖片，打開terminal，輸入以下指令：

```jsx
mkdir ~/cf-images
cd ~/cf-images
npm install sharp
```

{{< details summary="點擊展開新手友好的對應解釋：" >}}
- `mkdir ~/cf-images`的作用是在username主路徑下新建文件夾，你可以通過修改具體path改變文件夾的位置，比如`mkdir ~/Documents/cf-images`等等。
- `cd ~/cf-images`的作用是改變terminal裡你所處的位置，重新定位到剛剛創建的文件夾中。
- `npm install sharp` 安裝包，沒啥好說的。其它安裝方式可以參考[官方說明](https://sharp.pixelplumbing.com/)。
{{< /details >}}

- 在該文件夾內新建`input`，`output`，`archives`三個文件夾和`sharp-script.js`新文件，這一步我更喜歡用Visual Studio Code直接打開`cf-images`文件夾操作。然後複製粘貼以下代碼到`sharp-script.js`：

{{< details summary="點擊展開代碼詳情" >}}
```jsx
const fs = require('fs').promises;

const path = require('path');

const sharp = require('sharp');


const inputDir = './input'; //input folder path

const outputDir = './output'; //output folder path

  
async function processImage(inputPath, outputPath) {

try {

await sharp(inputPath)

.resize({ width: 1200 }) // Optional resize

.jpeg({ quality: 80 }) // Convert to JPEG and compress

.toFile(outputPath);

console.log(`✅ Processed: ${outputPath}`);


// Remove the original input file after processing

await fs.unlink(inputPath);

console.log(`🗑️ Deleted: ${inputPath}`);

} catch (error) {

console.error(`❌ Failed to process ${inputPath}:`, error);

}

}


async function processAllImages() {

try {

const files = await fs.readdir(inputDir);

  
const tasks = files.map(async (file) => {

const ext = path.extname(file).toLowerCase();

if (!['.heic', '.webp', '.tiff', '.svg', '.gif', '.jpg', '.jpeg', '.png'].includes(ext)) return; // Filter supported formats


const inputPath = path.join(inputDir, file);

const outputFileName = path.basename(file, ext) + '.jpg';

const outputPath = path.join(outputDir, outputFileName);


await processImage(inputPath, outputPath);

});


await Promise.all(tasks);

console.log('🎉 All images processed!');

} catch (err) {

console.error('❌ Error reading directory:', err);

}

}

processAllImages();
```
{{< /details >}}

- 把需要處理的圖片放進`input` folder，在terminal裡run `node sharp-script.js`，就可以把所有圖片優化並並導出到圖片到`output` folder，同時也會刪除`input` folder內的原圖。
### 3. 上傳圖片-Wrangler
- 依然在`cf-images`這個路徑內，首先運行`npm install -g wrangler`安裝wrangler
- 運行`wrangler login`，跳轉到cloudflare authentication頁面允許授權
- 新建`upload-images.js`，再次複製粘貼以下代碼，並注意將`const bucketName = "images";`這行的`images`替換為自己的bucket name：

{{< details summary="點擊展開代碼詳情" >}}
```jsx
const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const util = require("util");

const execPromise = util.promisify(exec); 
const folderPath = "./output"; 
const archivePath = "./archives";
const bucketName = "images"; // R2 bucket name

async function uploadImages() {

try {

const files = await fs.readdir(folderPath);


for (const file of files) {

if (file === ".DS_Store") continue; // Skip unwanted files

const filePath = path.join(folderPath, file);

const archiveFilePath = path.join(archivePath, file); // Path to move the file to archives

console.log(`Uploading ${file} to R2...`);

// Upload the file to R2

const uploadCommand = `wrangler r2 object put ${bucketName}/${file} --file ${filePath}`;

try {

const { stdout } = await execPromise(uploadCommand);

console.log(`Successfully uploaded ${file}:`, stdout);


// After uploading, move the file to the archives folder

await fs.rename(filePath, archiveFilePath);

console.log(`Moved ${file} to the archives folder.`);

} catch (uploadError) {

console.error(`Error uploading ${file}:`, uploadError);

}

}

} catch (err) {

console.error("Error scanning directory:", err);

}

}

uploadImages();
```
{{< /details >}}

- 運行`node upload-images.js`即可將`output`文件夾內所有圖片上傳到R2 bucket，該腳本同樣會刪除`output`文件夾內所有已上傳成功的文件，並將其移至`archives`文件夾存檔。

![R2 Screenshot2](https://images.gigigatgat.ca/20250307-screenshot2.jpg "顯示圖片上傳成功且已被刪除")
## 後情提要
經過幾天的測試和熟悉，發現了兩個cloudflare R2 bucket界面的UX缺陷——搜索功能不支持任意關鍵詞搜索，只能靠輸入prefix搜索（why!!）；只有前後頁的pagination，不會依據存儲的文件數量提供具體頁數。所以在圖片的管理上，我目前採取的做法是以「日期+名字」的格式統一命名，只要輸入日期就能找到當日或當年發布的博客包含的圖片，也方便複製粘貼鏈接時簡單修改命名就有信心對應到正確圖片。

![R2 Screenshot3](https://images.gigigatgat.ca/20250307-screenshot3.jpg)

