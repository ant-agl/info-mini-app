"use strict";
exports.__esModule = true;
exports.MarkdownText = void 0;
function escapeMarkdownV2(text) {
    // Экранирование специальных символов
    var replacements = {
        '\\*': '*',
        '\\_': '_',
        '\\`': '`',
        '\\[': '[',
        '\\]': ']',
        '\\(': '(',
        '\\)': ')',
        '\\~': '~',
        '\\>': '>',
        '\\#': '#',
        '\\+': '+',
        '\\-': '-',
        '\\=': '=',
        '\\|': '|',
        '\\{': '{',
        '\\}': '}',
        '\\.': '.',
        '\\!': '!',
        '\\\\': '\\'
    };
    for (var _i = 0, _a = Object.entries(replacements); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var regex = new RegExp(key, 'g');
        text = text.replace(regex, value);
    }
    return text;
}
function convertMarkdownV2ToHtml(markdown) {
    // Вначале обрабатываем экранирование
    markdown = escapeMarkdownV2(markdown);
    // Обработка всех MarkdownV2 элементов с учетом вложенности
    function processFormatting(markdown) {
        // Обработка жирного текста
        markdown = markdown.replace(/(\*)([^*]*?)\1/g, '<b>$2</b>');
        // Обработка подчеркнутого текста
        markdown = markdown.replace(/(__)(.*?)\1/g, '<u>$2</u>');
        // Обработка курсивного текста
        markdown = markdown.replace(/(_)([^_]*?)\1/g, '<i>$2</i>');
        // Обработка зачеркнутого текста
        markdown = markdown.replace(/(~)(.*?)\1/g, '<s>$2</s>');
        // Обработка скрытого текста
        markdown = markdown.replace(/(\|\|)(.*?)\1/g, '<span style="color: #efefef; background-color: #efefef; border-radius: 3px;">$2</span>');
        // Обработка моноширинного текста
        markdown = markdown.replace(/(`)(.*?)\1/g, '<code>$2</code>');
        // Обработка цитат
        markdown = markdown.replace(/^>(.*)$/gm, '<blockquote style="margin: 0;padding: 7px 15px;background: #0000001f;border-radius: 5px;">$1</blockquote>');
        // Обработка переноса строки
        markdown = markdown.replace(/(\n)/g, '<br />');
        return markdown;
    }
    // Рекурсивная обработка для вложенности
    function processNestedFormatting(markdown) {
        var previous;
        do {
            previous = markdown;
            markdown = processFormatting(markdown);
        } while (previous !== markdown);
        return markdown;
    }
    return processNestedFormatting(markdown);
}
exports.MarkdownText = function (_a) {
    var text = _a.text;
    return (React.createElement("span", { dangerouslySetInnerHTML: { __html: convertMarkdownV2ToHtml(text) } }));
};
