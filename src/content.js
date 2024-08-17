// content.js

// ユーザーがミーティング中かどうかを確認する関数
function isInMeeting() {
  // buttonタグ内に「[aria-label="画面を共有"]」があるかをチェック
  return document.querySelector('button[aria-label="画面を共有"]') !== null;
}

// 絵文字を表示する関数
function displayEmoji() {
  // 既に絵文字が表示されているかどうかを確認
  if (document.querySelector('.emoji-overlay')) return;

  // 新しいdiv要素を作成して絵文字を設定
  const emojiDiv = document.createElement('div');
  emojiDiv.innerText = '😊'; // 必要に応じてこの絵文字を変更可能
  emojiDiv.className = 'emoji-overlay';

  // 絵文字クリック時の処理を追加
  emojiDiv.addEventListener('click', () => {
    sendMessage('😊');
  });

  // 絵文字のdivをドキュメントのボディに追加
  document.body.appendChild(emojiDiv);
}

// 絵文字を削除する関数
function removeEmoji() {
  const emojiDiv = document.querySelector('.emoji-overlay');
  if (emojiDiv) {
    emojiDiv.remove();
  }
}

// チャットにメッセージを送信する関数
function sendMessage(message) {
  // チャットのtextareaを探す
  const chatInput = document.querySelector(
    'textarea[aria-label="メッセージを送信"]'
  );
  if (chatInput) {
    chatInput.value = message; // メッセージを設定
    chatInput.dispatchEvent(new Event('input', { bubbles: true })); // 入力イベントを発火

    // 送信ボタンを探してクリック
    const sendButton = document.querySelector(
      'button[aria-label="メッセージを送信"]'
    ); // 送信ボタンのaria-label
    if (sendButton) {
      sendButton.click(); // メッセージを送信
    }
  }
}

// DOMの変化を監視し、ユーザーがミーティングに参加または退出した際に検出する
const observer = new MutationObserver(() => {
  if (isInMeeting()) {
    displayEmoji();
  } else {
    removeEmoji();
  }
});

// ページのボディを監視開始（子要素とサブツリーの変更を含む）
observer.observe(document.body, { childList: true, subtree: true });

// ユーザーが既にミーティングに参加している場合に備えて、最初にチェック
if (isInMeeting()) {
  displayEmoji();
}
