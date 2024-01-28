import './Card.scss'
import { useEffect } from 'react'

// 朗读文本
function speakText(text: string) {
  // 取消当前的朗读任务
  window.speechSynthesis.cancel()
  // 创建一个SpeechSynthesisUtterance实例
  const utterance = new SpeechSynthesisUtterance(text)
  // 选择声音和语言等属性
  utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];
  utterance.pitch = 1; // 设置音调
  utterance.rate = 1; // 设置语速
  utterance.volume = 5; // 设置音量

  // 朗读文本
  window.speechSynthesis.speak(utterance)
}

function getSelectedText() {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection()?.toString() ?? ''
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  return text
}

export const Card = () => {
  useEffect(() => {
    // 检查浏览器是否支持文本朗读功能
    if ('speechSynthesis' in window) {
      const speakButton = document.getElementById('speakButton')
      const handleClick = function () {
        const selectedText = getSelectedText()
        if (selectedText.length) {
          speakText(selectedText)
        }
      }
    } else {
      alert('很抱歉，您的浏览器不支持文本朗读功能。')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 't') {
        const selectedText = getSelectedText()
        if (selectedText.length) {
          speakText(selectedText)
        }
      }
    }
    // 为文档添加键盘事件监听器
    document.addEventListener('keydown', handleKeyDown)

    // 在组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div></div>
}
