'use strict';

var ZeroClipboard = window.ZeroClipboard;

angular.module('insight')
  .directive('scroll', function ($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind('scroll', function() {
        if (this.pageYOffset >= 200) {
          scope.secondaryNavbar = true;
        } else {
          scope.secondaryNavbar = false;
        }
        scope.$apply();
      });
    };
  })
  .directive('whenScrolled', function($window) {
    return {
      restric: 'A',
      link: function(scope, elm, attr) {
        var pageHeight, clientHeight, scrollPos;
        $window = angular.element($window);

        var handler = function() {
          pageHeight = window.document.documentElement.scrollHeight;
          clientHeight = window.document.documentElement.clientHeight;
          scrollPos = window.pageYOffset;

          if (pageHeight - (scrollPos + clientHeight) === 0) {
            scope.$apply(attr.whenScrolled);
          }
        };

        $window.on('scroll', handler);

        scope.$on('$destroy', function() {
          return $window.off('scroll', handler);
        });
      }
    };
  })
  .directive('clipCopy', function() {
    // ZeroClipboard.config({
    //   moviePath: 'http://localhost:3001/insight/lib/zeroclipboard/ZeroClipboard.swf',
    //   swfPath: 'http://localhost:3001/insight/lib/zeroclipboard/ZeroClipboard.swf',
    //   trustedDomains: ['*'],
    //   allowScriptAccess: 'always',
    //   forceHandCursor: true
    // });

    return {
      restric: 'A',
      scope: { clipCopy: '=clipCopy' },
      template: '<div class="tooltip right fade in"><div class="tooltip-arrow"></div><div class="tooltip-inner">Copied!</div></div>',
      link: function(scope, elm) {
        function resetTooltip() {
          elm.removeClass("is-active");
        }

        elm.on("click", function (e) {
          var i = document.createElement("input");
          var c = false;
          i.value = scope.clipCopy;
          document.body.append(i);
          i.select();
          if (document.queryCommandEnabled("copy")) {
            c = document.execCommand("copy");
          }
          i.remove();
          if (c) {
            elm.addClass("is-active");
            setTimeout(resetTooltip, 1000);
          }
        });

        // var clip = new ClipboardJS(elm);
        // console.log(clip);
        // var clip = new ZeroClipboard(elm);
        // console.log(clip);

        // clip.on('load', function(client) {
        //   var onMousedown = function(client) {
        //     client.setText(scope.clipCopy);
        //   };

        //   client.on('mousedown', onMousedown);

        //   scope.$on('$destroy', function() {
        //     client.off('mousedown', onMousedown);
        //   });
        // });

        // clip.on('noFlash wrongflash', function() {
        //   console.error("wrong flash");
        //   return elm.remove();
        // });
      }
    };
  })
  .directive('focus', function ($timeout) {
    return {
      scope: {
        trigger: '@focus'
      },
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === "true") {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
      }
    };
  });
