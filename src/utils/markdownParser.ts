
export const parseMarkdownContent = (content: string): string => {
  if (!content) return '';
  
  const lines = content.split('\n');
  const parsedLines = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Handle multi-line code blocks
    if (line.startsWith('```')) {
      const language = line.substring(3).trim();
      const codeLines = [];
      i++; // Move to next line after opening ```
      
      // Collect code lines until closing ```
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      
      // Skip the closing ``` line
      if (i < lines.length && lines[i].startsWith('```')) {
        i++;
      }
      
      const codeContent = codeLines.join('\n');
      const languageClass = language ? ` data-language="${language}"` : '';
      parsedLines.push(`<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto border"${languageClass}><code class="text-sm font-mono text-gray-900 dark:text-gray-100 whitespace-pre">${escapeHtml(codeContent)}</code></pre>`);
      continue;
    }
    
    // Handle headers
    if (line.startsWith('## ')) {
      parsedLines.push(`<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100">${line.substring(3)}</h2>`);
    } else if (line.startsWith('# ')) {
      parsedLines.push(`<h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">${line.substring(2)}</h1>`);
    } else if (line.startsWith('### ')) {
      parsedLines.push(`<h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">${line.substring(4)}</h3>`);
    }
    // Handle bullet points
    else if (line.startsWith('- ')) {
      parsedLines.push(`<li class="mb-2">${parseInlineCode(line.substring(2))}</li>`);
    }
    // Handle regular paragraphs
    else if (line.trim() === '') {
      parsedLines.push('<br>');
    }
    else {
      parsedLines.push(`<p class="mb-4 leading-relaxed">${parseInlineCode(line)}</p>`);
    }
    
    i++;
  }
  
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

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

const parseInlineCode = (text: string): string => {
  // Handle inline code first to avoid conflicts
  let parsed = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>');

  // Handle bold text with ****
  parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');

  return parsed;
};
