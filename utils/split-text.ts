type SplitOptions = {
  type?: "words" | "chars"
}

export function splitText(element: Element, options: SplitOptions = { type: "words" }): Element[] {
  const text = element.textContent || ""
  element.textContent = ""

  // Split by characters
  if (options.type === "chars") {
    const chars: Element[] = []

    text.split("").forEach((char) => {
      const span = document.createElement("span")
      span.className = "split-char"
      span.textContent = char
      element.appendChild(span)
      chars.push(span)
    })

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
