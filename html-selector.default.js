/**
 * Main module
 */
var HtmlSelectorModule = (function(doc, config) {
    var init = function() {
        if (!doc.querySelector(config.elem)) return;
        _createSelect(config);
        _addEventListeners(config);
    }

    var _addEventListeners = function(config) {
        // main select box
        var box = doc.querySelector('.' + config.selectBoxClassName);
        if (box) { box.addEventListener('click', function() { box.classList.toggle('open'); }, false); }
        // option items
        var optionList = doc.querySelectorAll('.' + config.options.itemClassName);
        if (optionList.length) {
            Array.from(optionList).map(function(option) {
                option.addEventListener('click', function() {
                    var selectList = doc.querySelectorAll(config.elem);
                    if (selectList.length) {
                        Array.from(selectList).map(function(select) {
                            Array.from(select.children).map(item => item.removeAttribute('selected'));
                            var selectedOption = Array.from(select.children).find(function(item) { return item.value === option.getAttribute('rel')});
                            selectedOption.setAttribute('selected', '');
                            box.classList.remove('open');
                            var icon =  box.children[0].cloneNode();
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

    var _createSelect = function(config) {
        _createSelectParent(doc.querySelector(config.elem), config);
        var selectParent = doc.querySelector('.' + config.selectParentClassName);

        if (selectParent) {
            selectParent.style.position = 'relative';
            var formSelect = selectParent.querySelector(config.selectElement);
            if (formSelect) {
                var elements = formSelect.children;
                var optionList = [];
                if (elements.length) {
                    Array.from(elements).map(function(element) {
                        optionList.push({
                            value: element.value.length ? element.value : '',
                            label: element.innerHTML
                        })
                    });
                    var box = optionList.slice().shift();
                    selectParent.appendChild(_createSelectBox(box, config))
                    selectParent.appendChild(_createOptionList(optionList, config));
                }
            }
        }
    }

    var _createSelectParent = function(select, config) {
        if ('SELECT' === select.tagName) {
            var selectClone = select.cloneNode(true);
            var parent = doc.createElement('div');
            parent.classList.add(config.selectParentClassName);
            parent.appendChild(selectClone);
            select.parentNode.insertBefore(parent, select);
            select.parentNode.removeChild(select);
        }
    }

    var _createOptionList = function(optionList, config) {
        var container = doc.createElement('div');
        container.classList.add(config.options.groupClassName);
        optionList.map(function(item, index) {
            if (0 !== index) {
                var option = doc.createElement('div');
                option.classList.add(config.options.itemClassName);
                option.setAttribute('rel', item.value);
                option.innerHTML = item.label;
                container.appendChild(option);
            }
        });
        return container;
    }

    var _createSelectBox = function(selectBox, config) {
        var container = doc.createElement('div');
        container.classList.add(config.selectBoxClassName);
        container.innerHTML = selectBox.label;
        container.appendChild(_createSelectIcon());
        return container;

    }

    var _createSelectIcon = function() {
        var icon = doc.createElement('span');
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
