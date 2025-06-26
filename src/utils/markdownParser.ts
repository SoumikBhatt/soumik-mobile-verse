
export const parseMarkdownContent = (content: string): string => {
  if (!content) return '';
  
  const lines = content.split('\n');
  const parsedLines = lines.map(line => {
    // Handle headers
    if (line.startsWith('## ')) {
      return `<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100">${line.substring(3)}</h2>`;
    } else if (line.startsWith('# ')) {
      return `<h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">${line.substring(2)}</h1>`;
    } else if (line.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">${line.substring(4)}</h3>`;
    }
    
    // Handle bullet points
    if (line.startsWith('- ')) {
      return `<li class="mb-2">${parseInlineCode(line.substring(2))}</li>`;
    }
    
    // Handle regular paragraphs
    if (line.trim() === '') {
      return '<br>';
    }
    
    return `<p class="mb-4 leading-relaxed">${parseInlineCode(line)}</p>`;
  });
  
  // Wrap consecutive list items in ul tags
  const result = [];
  let inList = false;
  
  for (const line of parsedLines) {
    if (line.startsWith('<li')) {
      if (!inList) {
        result.push('<ul class="mb-4 ml-6 list-disc">');
        inList = true;
      }
      result.push(line);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(line);
    }
  }
  
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('');
};

const parseInlineCode = (text: string): string => {
  // Handle inline code first to avoid conflicts
  let parsed = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>');

  // Handle bold text with ****
  parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');

  return parsed;
};
