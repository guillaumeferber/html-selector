/**
 * Main module
 */
const HtmlSelectorModule = (function(doc, config) {
    const init = function() {
        _createSelect(config);
        _addEventListeners(config);
    }

    const _addEventListeners = function(config) {
        // main select box
        const box = doc.querySelector('.' + config.selectBoxClassName);
        if (box) { box.addEventListener('click', function() { box.classList.toggle('open'); }, false); }
        // option items
        const optionList = doc.querySelectorAll('.' + config.options.itemClassName);
        if (optionList.length) {
            Array.from(optionList).map(function(option) {
                option.addEventListener('click', function() {
                    const selectList = doc.querySelectorAll(config.elem);
                    if (selectList.length) {
                        Array.from(selectList).map(function(select) {
                            Array.from(select.children).map(item => item.removeAttribute('selected'));
                            const selectedOption = Array.from(select.children).find(function(item) { return item.value === option.getAttribute('rel')});
                            selectedOption.setAttribute('selected', '');
                            box.classList.remove('open');
                            const icon =  box.children[0].cloneNode();
                            box.innerText = option.innerText;
                            box.appendChild(icon);
                        });
                    }
                 }, false);
            });
        }

        doc.addEventListener('click', function(e) {
            if (e.target !== box) {
                if (box.classList.contains('open')) {
                    box.classList.remove('open');
                }
            }
        }, false);
    }

    const _createSelect = function(config) {
        if (!doc.querySelector(config.elem)) return;
        _createSelectParent(doc.querySelector(config.elem), config);
        const selectParent = doc.querySelector('.' + config.selectParentClassName);

        if (selectParent) {
            selectParent.style.position = 'relative';
            const formSelect = selectParent.querySelector(config.selectElement);
            if (formSelect) {
                const elements = formSelect.children;
                const optionList = [];
                if (elements.length) {
                    Array.from(elements).map(function(element) {
                        optionList.push({
                            value: element.value.length ? element.value : '',
                            label: element.innerHTML
                        })
                    });
                    const box = optionList.slice().shift();
                    selectParent.appendChild(_createSelectBox(box, config))
                    selectParent.appendChild(_createOptionList(optionList, config));
                }
            }
        }
    }

    const _createSelectParent = function(select, config) {
        if ('SELECT' === select.tagName) {
            const selectClone = select.cloneNode(true);
            const parent = doc.createElement('div');
            parent.classList.add(config.selectParentClassName);
            parent.appendChild(selectClone);
            select.parentNode.insertBefore(parent, select);
            select.parentNode.removeChild(select);
        }
    }

    const _createOptionList = function(optionList, config) {
        const container = doc.createElement('div');
        container.classList.add(config.options.groupClassName);
        optionList.map(function(item, index) {
            if (index > 0) {
                const option = doc.createElement('div');
                option.classList.add(config.options.itemClassName);
                option.setAttribute('rel', item.value);
                option.innerHTML = item.label;
                container.appendChild(option);
            }
        });
        return container;
    }

    const _createSelectBox = function(selectBox, config) {
        const container = doc.createElement('div');
        container.classList.add(config.selectBoxClassName);
        container.innerHTML = selectBox.label;
        container.appendChild(_createSelectIcon());
        return container;

    }

    const _createSelectIcon = function() {
        const icon = doc.createElement('span');
        icon.classList.add('c-select__icon');
        return icon;
    }

    return {
        init: init
    }
})(window.document, {
    elem: '.js-select',
    selectParentClassName: 'c-select',
    selectElement: 'select',
    options: {
        groupClassName: 'c-select__option-group',
        itemClassName: 'c-select__option-group__item'
    },
    selectBoxClassName: 'c-select__option-box'
}).init();
