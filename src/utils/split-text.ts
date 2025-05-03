type SplitOptions = {
  type?: "words" | "chars"
  preserveSpaces?: boolean
}

export function splitText(element: Element, options: SplitOptions = { type: "words" }): Element[] {
  const text = element.textContent || ""
  element.textContent = ""

  // Split by characters
  if (options.type === "chars") {
    const chars: Element[] = []

    // If we want to preserve spaces between words
    if (options.preserveSpaces) {
      // Split the text into words first
      const words = text.split(/(\s+)/)

      // Then split each word into characters
      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          // This is a space/whitespace
          const space = document.createTextNode(word)
          element.appendChild(space)
        } else {
          // This is a word, split into characters
          word.split("").forEach((char) => {
            const span = document.createElement("span")
            span.className = "split-char"
            span.textContent = char
            element.appendChild(span)
            chars.push(span)
          })
        }
      })
    } else {
      // Original behavior - split all characters including spaces
      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.className = "split-char"
        span.textContent = char
        element.appendChild(span)
        chars.push(span)
      })
    }

    return chars
  }
  // Split by words (default)
  else {
    const words: Element[] = []

    text.split(/\s+/).forEach((word, i, arr) => {
      const span = document.createElement("span")
      span.className = "split-word"
      span.textContent = word
      element.appendChild(span)
      words.push(span)

      // Add space after word (except for the last word)
      if (i < arr.length - 1) {
        element.appendChild(document.createTextNode(" "))
      }
    })

    return words
  }
}
