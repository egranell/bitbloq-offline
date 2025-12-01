'use strict';
(function (bloqsDotsMatrix, bloqsLanguages, bloqsUtils) {

    var bloqsWindow,
        dotsContainer,
        _windowParent,
        showWindowCallback,
        dots = [],
        _userIsDragging = false;

    function init(windowParent, schemas) {
        _windowParent = windowParent || _windowParent;
    }

    function showDotsWindow(params) {

        params = params || {};

        params.workspaceWidth = params.workspaceWidth || 0;
        params.workspaceHeight = params.workspaceHeight || 0;

        params.launcherTopPoint = params.launcherTopPoint || 0;
        params.launcherBottomPoint = params.launcherBottomPoint || 0;

        params.fieldOffsetTop = params.fieldOffsetTop || 0;
        params.fieldOffsetLeft = params.fieldOffsetLeft || 0;
        params.fieldOffsetRight = params.fieldOffsetRight || 0;
        params.fieldScrollTop = params.fieldScrollTop || 0;
        params.fieldScrollLeft = params.fieldScrollLeft || 0;



        showWindowCallback = params.showWindowCallback;

        showWindow(params);
        setMatrix(params.dotsMatrixOptions.value, params.dotsMatrixOptions.options);
        moveWindow({
            launcherTopPoint: params.launcherTopPoint,
            launcherHeight: params.launcherHeight,
            launcherBottomPoint: params.launcherBottomPoint,
            bloqsWindowWidth: bloqsWindow.offsetWidth,
            bloqsWindowHeight: bloqsWindow.offsetHeight,
            workspaceHeight: params.workspaceHeight,
            workspaceWidth: params.workspaceWidth,
            fieldOffsetTop: params.fieldOffsetTop,
            fieldOffsetLeft: params.fieldOffsetLeft,
            fieldOffsetRight: params.fieldOffsetRight,
            fieldScrollTop: params.fieldScrollTop,
            fieldScrollLeft: params.fieldScrollLeft
        });
    }

    function createDotsContent(params) {
        var tempRowContainer, tempDotContainer;
        for (var i = 0; i < params.dotsMatrixOptions.options.rows; i++) {
            tempRowContainer = document.createElement('div');
            tempRowContainer.className += 'bloqs-dots-row';
            dots[i] = [];
            for (var j = 0; j < params.dotsMatrixOptions.options.columns; j++) {
                tempDotContainer = document.createElement('div');
                tempDotContainer.className += 'bloqs-dots-dot';
                dots[i].push(tempDotContainer);
                dots[i][j].addEventListener('mouseover', overDot);

                tempRowContainer.appendChild(tempDotContainer);
            }
            dotsContainer.appendChild(tempRowContainer); //TODO just 1 append function on bloqsutils
        }
    };

    function convertHexArrayToMatrix(hexArray, rows, columns) {
        //"{ 0xff,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0 }"
        var matrix = bloqsUtils.createMatrix(rows, columns);
        var hexArrayItems = hexArray.replace('{', '').replace('}', '').replace(/ /g, '').replace(/0x/g, '').split(',');
        for (var i = 0; i < hexArrayItems.length; i++) {
            hexArrayItems[i] = parseInt(hexArrayItems[i], 16).toString(2);
            hexArrayItems[i] = hexArrayItems[i].split('').reverse().join('');
        }
        for (var j = 0; j < hexArrayItems.length; j++) {
            for (var k = 0; k < rows; k++) {
                if (hexArrayItems[j].charAt(k) === '1') {
                    matrix[(rows - 1 - k)][j] = true;
                } else {
                    matrix[(rows - 1 - k)][j] = false;
                }

            }
        }
        return matrix;
    };

    function setMatrix(matrix, options) {
        if (matrix) {
            matrix = convertHexArrayToMatrix(matrix, options.rows, options.columns);
        } else {
            matrix = bloqsUtils.createMatrix(options.rows, options.columns);
        }

        for (var i = 0; i < dots.length; i++) {
            for (var j = 0; j < dots[i].length; j++) {
                if (matrix[i][j]) {
                    if (dots[i][j].className.indexOf('active') === -1) {
                        dots[i][j].className += ' active';
                    }
                } else {
                    dots[i][j].className = dots[i][j].className.replace('active', '');
                }

            }
        }
    }

    function getMatrix() {
        var result = [];
        var binaries = [];
        //init array
        for (var k = 0; k < dots[0].length; k++) {
            binaries[k] = '';
        }

        for (var i = 0; i < dots.length; i++) {
            result[i] = [];

            for (var j = 0; j < dots[i].length; j++) {
                result[i][j] = (dots[i][j].className.indexOf('active') !== -1);
                if (result[i][j]) {
                    binaries[j] += '1';
                } else {
                    binaries[j] += '0';
                }

            }
        }

        //parse to hex
        for (var l = 0; l < binaries.length; l++) {
            binaries[l] = '0x' + parseInt(binaries[l], 2).toString(16);
        }

        binaries = binaries.toString();

        return binaries;
    }

    function toggleDot(evt) {
        var dot = evt.target;
        if (dot.className.indexOf('active') === -1) {
            dot.className += ' active';
        } else {
            dot.className = dot.className.replace('active', '');
        }
        getMatrix();
    }

    function overDot(evt) {
        if (_userIsDragging) {
            var dot = evt.target;
            if (dot.className.indexOf('active') === -1) {
                dot.className += ' active';
            }
        }
    }

    function showWindow(params) {
        if (!bloqsWindow) {
            bloqsWindow = document.createElement('div');
            bloqsWindow.className = 'dotsMatrix-window';

            dotsContainer = document.createElement('div');
            dotsContainer.className = 'dots-container';

            var topTriangle = document.createElement('div');
            topTriangle.className += 'triangle top';

            var bottomTriangle = document.createElement('div');
            bottomTriangle.className += 'triangle bottom';

            createDotsContent(params);

            bloqsWindow.addEventListener('mousedown', function (evt) {
                bloqsWindow.addEventListener('mouseup', function () {
                    _userIsDragging = false;
                });
                _userIsDragging = true;
                toggleDot(evt);

            });
            bloqsWindow.addEventListener('mouseleave', function () {
                _userIsDragging = false;
                hideWindow();
            });

            bloqsWindow.appendChild(topTriangle);

            bloqsWindow.appendChild(dotsContainer);
            bloqsWindow.appendChild(bottomTriangle);

            _windowParent.appendChild(bloqsWindow);
        } else {
            changeShowWindowsClass();
        }


        return bloqsWindow;
    }

    var timeoutId;

    function hideWindow() {
        if (!timeoutId) {
            bloqsWindow.addEventListener('mouseover', cancelHideTimeout);
            if (bloqsWindow.className.indexOf('opacity0') === -1) {
                bloqsWindow.className += ' opacity0';
            }
            timeoutId = setTimeout(function () {
                timeoutId = null;
                if (bloqsWindow.className.indexOf('hide') === -1) {
                    bloqsWindow.className += ' hide';
                }
                bloqsWindow.removeEventListener('mouseover', cancelHideTimeout);
                window.dispatchEvent(new Event('bloqs:dotsMatrixClosed'));
                showWindowCallback(getMatrix());
            }, 300);
        }

    }

    function cancelHideTimeout() {
        bloqsWindow.removeEventListener('mouseover', cancelHideTimeout);
        changeShowWindowsClass();
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    function changeShowWindowsClass() {
        bloqsWindow.className = bloqsWindow.className.replace('opacity0', '').replace('hide', '');
    }

    function moveWindow(params) {
        bloqsWindow.className = bloqsWindow.className.replace(' right', '');
        bloqsWindow.className = bloqsWindow.className.replace(' top', '');

        var heightExtraOffset = 0,
            widthExtraOffset = 31,
            finalPoint = {},
            bottomFreeSpace = params.workspaceHeight + params.fieldOffsetTop - params.launcherBottomPoint.top,
            topFreeSpace = params.launcherTopPoint.top - params.fieldOffsetTop,
            heightNeededSpace = params.bloqsWindowHeight + heightExtraOffset,
            rightFreeSpace = params.workspaceWidth - params.fieldOffsetRight - (params.launcherBottomPoint.left - params.fieldOffsetLeft),
            leftFreeSpace = params.launcherBottomPoint.left - params.fieldOffsetLeft,
            widthNeededSpace = params.bloqsWindowWidth + widthExtraOffset;

        if ((bottomFreeSpace >= heightNeededSpace) || (bottomFreeSpace >= topFreeSpace) || (topFreeSpace < heightNeededSpace)) {
            finalPoint.top = params.launcherBottomPoint.top - params.fieldOffsetTop + heightExtraOffset + params.fieldScrollTop;
        } else {
            finalPoint.top = params.launcherTopPoint.top - params.fieldOffsetTop - params.bloqsWindowHeight - heightExtraOffset + params.fieldScrollTop;
            bloqsWindow.className += ' top';
        }

        if ((rightFreeSpace >= widthNeededSpace) || (rightFreeSpace >= leftFreeSpace) || (leftFreeSpace < widthNeededSpace)) {
            finalPoint.left = params.launcherBottomPoint.left - params.fieldOffsetLeft - widthExtraOffset + params.fieldScrollLeft;
        } else {
            finalPoint.left = params.launcherBottomPoint.left - params.fieldOffsetLeft - params.bloqsWindowHeight + widthExtraOffset + params.fieldScrollLeft;
            bloqsWindow.className += ' left';
        }


        bloqsWindow.style.transform = 'translate(' + finalPoint.left + 'px,' + finalPoint.top + 'px)';
    }



    bloqsDotsMatrix.init = init;
    bloqsDotsMatrix.showDotsWindow = showDotsWindow;

    return bloqsDotsMatrix;

})(window.bloqsDotsMatrix = window.bloqsDotsMatrix || {}, bloqsLanguages, bloqsUtils, undefined);
