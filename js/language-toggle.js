document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("langToggleBtn");
  const label = document.getElementById("langLabel");

  if (!btn || !label) return;

  const langMap = { s: "cn", t: "hk" };
  let originalLang = "s"; // 默认简体
  let currentLang = "s";

  function detectInitialLang() {
    const text = document.body.innerText;
    const simplifiedChars = ["个", "简", "么", "国", "这", "没", "图"];
    const traditionalChars = ["個", "簡", "麼", "國", "這", "沒", "圖"];
    let simplifiedCount = 0;
    let traditionalCount = 0;
    simplifiedChars.forEach((char) => {
      if (text.includes(char)) simplifiedCount++;
    });
    traditionalChars.forEach((char) => {
      if (text.includes(char)) traditionalCount++;
    });
    return traditionalCount >= simplifiedCount ? "t" : "s";
  }

  function updateButtonUI(lang) {
    if (lang === "s") {
      label.textContent = "简体中文";
      btn.title = "切换为繁体中文";
    } else {
      label.textContent = "繁體中文";
      btn.title = "切換為簡體中文";
    }
  }

  setTimeout(() => {
    originalLang = detectInitialLang();
    currentLang = originalLang;
    updateButtonUI(currentLang);
  }, 200);

  setTimeout(() => {
    const textNodes = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          const el = node.parentElement;
          if (!el) return NodeFilter.FILTER_ACCEPT;

          // 避免转换语言按钮上的所有文本
          if (el.closest("#langToggleBtn") || el.closest("#langLabel")) {
            return NodeFilter.FILTER_REJECT;
          }

          // 排除博客標題
          if (
            el.closest(".logo") ||
            el.closest('a[href="/"]') ||
            el.closest('meta[property="og:title"]')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    while (walker.nextNode()) {
      textNodes.push({
        node: walker.currentNode,
        originalText: walker.currentNode.textContent,
        convertedText: null,
      });
    }

    btn.addEventListener("click", () => {
      if (currentLang === originalLang) {
        const targetLang = originalLang === "s" ? "t" : "s";
        const converter = OpenCC.Converter({
          from: langMap[originalLang],
          to: langMap[targetLang],
        });

        textNodes.forEach((item) => {
          if (item.convertedText === null) {
            item.convertedText = converter(item.originalText);
          }

          item.node.textContent = item.convertedText;
        });

        currentLang = targetLang;
      } else {
        textNodes.forEach((item) => {
          item.node.textContent = item.originalText;
        });

        currentLang = originalLang;
      }

      updateButtonUI(currentLang);
    });
  }, 300);
});
