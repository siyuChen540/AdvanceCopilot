// ==UserScript==
// @name Advance Claude
// @namespace http://tampermonkey.net/
// @version 2024-04-22
// @description try to take over the world!
// @author SiyuChen
// @grant GM_xmlhttpRequest
// @match https://claude.ai/chat/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// ==/UserScript==

(function() {
    'use strict';

    console.log('start');

    // Your code here...

    // 创建一个新的div元素
    const newDiv = document.createElement('div');
    newDiv.classList.add('fixed', 'bottom-0', 'left-0', 'p-4', 'flex', 'items-start', 'gap-4');

    // 创建一个输入框元素
    const inputBox = document.createElement('input');
    inputBox.type = 'url';
    inputBox.placeholder = 'Enter a URL';
    inputBox.classList.add('flex-1', 'border', 'border-gray-300', 'rounded', 'px-2', 'py-1');

    // 创建一个确认按钮元素
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.classList.add('bg-blue-500', 'text-white', 'rounded', 'px-4', 'py-1');

    // 将输入框和确认按钮添加到新的div中
    newDiv.appendChild(inputBox);
    newDiv.appendChild(confirmButton);

    // 将新的div添加到body元素中
    document.body.appendChild(newDiv);


    // 添加确认按钮的点击事件
    confirmButton.addEventListener('click', function() {
        // 获取输入框中的网址
        const url = inputBox.value;
        console.log(url);

        // 获取要修改内容的<p>元素
        const contentParagraph = document.querySelector('p[data-placeholder="Reply to Claude..."]');
        // 使用 GM_xmlhttpRequest 函数获取网页内容
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                let responseText = response.responseText;

                // 预处理:将获取到的内容中的换行符替换为空格
                responseText = responseText.replace(/\n/g, ' ');

                // 修改获取到的文本内容的前缀
                const modifiedText = 'One of the background knowledge is: ' + responseText;
                console.log(modifiedText);

                // 将修改后的文本设置为<p>元素的内容
                contentParagraph.textContent = modifiedText;
                contentParagraph.classList.remove('is-empty', 'is-editor-empty');
                console.log(contentParagraph);
            },
            onerror: function(error) {
                console.error('Error fetching URL:', error);
                // 处理获取网页内容时的错误
            }
        });
    });
})();