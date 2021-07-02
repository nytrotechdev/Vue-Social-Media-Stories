//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    width: Number,
    height: Number,
    stories: Array,
    loop: Boolean,
    isPause: Boolean,
    fullscreenMode: Boolean
  },

  data() {
    return {
      styles: {
        social_stories_container_style: {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          backgroundPosition: "center",
          backgroundImage: "",
          color: "white",
          position: 'relative',
          left: '',
          marginLeft: '',
          zIndex: '3500',
          top: '',
          boxShadow: '5px 5px 10px gray'
        },
        default_social_stories_container_style: {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          backgroundPosition: "center",
          color: "white",
          position: 'relative',
          left: '',
          marginLeft: '',
          zIndex: '3500',
          top: '',
          boxShadow: '5px 5px 10px gray'
        },
        social_stories_progress_container: {
          display: 'flex',
          padding: '10px 10px'
        },
        social_stories_progress_box: {
          margin: '2px',
          height: '3px',
          background: 'grey',
          cursor: 'pointer',
          width: 100 / this.stories.length + '%'
        },
        social_video_frame_style: {
          width: "99.9%",
          height: "96%",
          objectFit: "cover"
        },
        default_social_video_frame_style: {
          width: "99.9%",
          height: "96%",
          objectFit: "cover"
        },
        social_seemore: {
          height: '100%',
          width: '100%',
          cursor: 'pointer'
        },
        social_seemore_box: {
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          height: '15%',
          background: 'transparent',
          bottom: '0',
          overflow: 'hidden',
          animation: '',
          animationFillMode: ''
        },
        social_seemore_box_inner: {
          display: 'table',
          margin: '0 auto',
          width: '70px',
          textAlign: 'center'
        },
        arrow_style: {
          fill: 'white'
        },
        see_more_content: {
          display: 'none',
          padding: '10px'
        },
        see_more_text: {
          margin: '0px',
          fontFamily: 'monospace'
        },
        fullscreen_button: {
          position: 'absolute',
          right: '3%',
          top: '6%',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          color: 'white',
          cursor: 'pointer'
        },
        vue_social_stories: {
          position: '',
          left: '',
          top: '',
          width: '',
          height: '',
          backgroundColor: '',
          zIndex: ''
        },
        left_frame_button: {
          display: 'none',
          position: 'absolute',
          left: '25%',
          top: '50%',
          marginTop: '-40px',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          color: 'white',
          cursor: 'pointer'
        },
        right_frame_button: {
          display: 'none',
          position: 'absolute',
          right: '25%',
          top: '50%',
          marginTop: '-40px',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          color: 'white',
          cursor: 'pointer'
        }
      },
      frame: 0,
      pauseState: false,
      fullscreen: false,
      showVideo: false,
      seemoreClick: false,
      arrowClick: false,
      render_seemore_component: '',
      render_header_component: ''
    };
  },

  methods: {
    previous_frame() {
      this.stop_all_animation();

      if (this.frame == 0) {
        for (var i = 0; i < this.stories.length; i++) {
          this.$refs['progress' + i][0].style.width = '100%';
        }

        this.$refs['box' + this.frame][0].style.display = 'none';
        this.frame = this.stories.length - 1;
      } else {
        for (var i = 0; i <= this.frame; i++) {
          this.$refs['progress' + i][0].style.width = '100%';
        }

        for (var i = this.frame - 1; i <= this.frame; i++) {
          this.$refs['progress' + i][0].style.width = '0%';
        }

        this.$refs['box' + this.frame][0].style.display = 'none';
        this.frame--;
      }

      this.set_frame_url();
      setTimeout(() => {
        this.set_frame_duration();
      }, 500);
    },

    next_frame() {
      this.stop_all_animation();

      if (this.frame == this.stories.length - 1) {
        for (var i = 0; i < this.stories.length; i++) {
          this.$refs['progress' + i][0].style.width = '0%';
        }

        this.$refs['box' + this.frame][0].style.display = 'none';
        this.frame = 0;
      } else {
        for (var i = 0; i < this.frame + 1; i++) {
          this.$refs['progress' + i][0].style.width = '100%';
        }

        this.$refs['box' + this.frame][0].style.display = 'none';
        this.frame++;
      }

      this.set_frame_url();
      setTimeout(() => {
        this.set_frame_duration();
      }, 500);
    },

    toogle_fullscreen() {
      if (this.fullscreen) {
        this.styles.left_frame_button.display = 'none';
        this.styles.right_frame_button.display = 'none';
        this.styles.vue_social_stories.position = '';
        this.styles.vue_social_stories.zIndex = '';
        this.styles.vue_social_stories.left = '';
        this.styles.vue_social_stories.top = '';
        this.styles.vue_social_stories.width = '';
        this.styles.vue_social_stories.height = '';
        this.styles.vue_social_stories.backgroundColor = '';
        this.styles.social_stories_container_style.width = this.width + 'px';
        this.styles.social_stories_container_style.height = this.height + 'px';
        this.styles.social_stories_container_style.position = 'relative';
        this.styles.social_stories_container_style.top = '';
        this.styles.social_stories_container_style.left = '';
        this.styles.social_stories_container_style.marginLeft = '';
        this.styles.default_social_stories_container_style.width = this.width + 'px';
        this.styles.default_social_stories_container_style.height = this.height + 'px';
        this.styles.default_social_stories_container_style.position = 'relative';
        this.styles.default_social_stories_container_style.top = '';
        this.styles.default_social_stories_container_style.left = '';
        this.styles.default_social_stories_container_style.marginLeft = '';
        this.fullscreen = false;
      } else {
        this.styles.left_frame_button.display = '';
        this.styles.right_frame_button.display = '';
        this.styles.vue_social_stories.position = 'absolute';
        this.styles.vue_social_stories.zIndex = '3000';
        this.styles.vue_social_stories.left = '0px';
        this.styles.vue_social_stories.top = '0px';
        this.styles.vue_social_stories.width = '100%';
        this.styles.vue_social_stories.height = '100%';
        this.styles.vue_social_stories.backgroundColor = 'rgba(0,0,0,0.5)';
        this.styles.social_stories_container_style.width = screen.width * 0.27 + 'px';
        this.styles.social_stories_container_style.height = screen.height * 0.83 + 'px';
        this.styles.social_stories_container_style.position = 'absolute';
        this.styles.social_stories_container_style.top = '1%';
        this.styles.social_stories_container_style.left = '50%';
        this.styles.social_stories_container_style.marginLeft = '-' + screen.width * 0.27 / 2 + 'px';
        this.styles.default_social_stories_container_style.width = screen.width * 0.27 + 'px';
        this.styles.default_social_stories_container_style.height = screen.height * 0.83 + 'px';
        this.styles.default_social_stories_container_style.position = 'absolute';
        this.styles.default_social_stories_container_style.top = '1%';
        this.styles.default_social_stories_container_style.left = '50%';
        this.styles.default_social_stories_container_style.marginLeft = '-' + screen.width * 0.27 / 2 + 'px';
        this.fullscreen = true;
      }
    },

    seemore_click() {
      if (this.seemoreClick) {
        this.play_frame();
        this.styles.arrow_style.fill = 'white';
        this.styles.social_seemore_box.height = '15%';
        this.styles.social_seemore_box.background = 'transparent';
        this.styles.social_seemore_box.animation = 'slidedown 1s ease';
        this.styles.social_seemore_box.animationFillMode = 'forwards';
        this.styles.see_more_content.display = 'none';
        this.seemoreClick = false;
        this.arrowClick = false;
      } else {
        this.pause_frame();
        this.styles.arrow_style.fill = 'black';
        this.styles.social_seemore_box.height = '100%';
        this.styles.social_seemore_box.background = 'white';
        this.styles.social_seemore_box.animation = 'slideup 1s ease';
        this.styles.social_seemore_box.animationFillMode = 'forwards';
        this.styles.see_more_content.display = '';
        this.render_seemore_component = this.stories[this.frame].seemore;
        this.seemoreClick = true;
        this.arrowClick = true;
      }
    },

    stop_all_animation() {
      for (var i = 0; i < this.stories.length; i++) {
        this.$refs['progress' + i][0].style.width = '0%';
        this.$refs['progress' + i][0].style.animation = '';
        this.$refs['progress' + i][0].style.animationFillMode = '';
      }
    },

    progress_click(index) {
      this.stop_all_animation();

      for (var i = 0; i < index; i++) {
        this.$refs['progress' + i][0].style.width = '100%';
      }

      this.$refs['box' + this.frame][0].style.display = 'none';
      this.frame = index;
      this.set_frame_url();
      setTimeout(() => {
        this.set_frame_duration();
      }, 500);
    },

    toogle_video_pause() {
      if (this.pauseState) {
        this.play_frame();
      } else {
        this.pause_frame();
      }
    },

    pause_frame() {
      this.pauseState = true;
      this.$refs['progress' + this.frame][0].style.animationPlayState = 'paused';
      this.$refs['video_source'].pause();
    },

    play_frame() {
      this.pauseState = false;
      this.$refs['progress' + this.frame][0].style.animationPlayState = '';
      this.$refs['video_source'].play();
    },

    toogle_pause() {
      if (this.isPause) {
        if (this.pauseState) {
          this.play_frame();
        } else {
          this.pause_frame();
        }
      }
    },

    progress(index, duration) {
      if (index == 0) {
        if (duration) {
          var duration = duration / 1000;
        } else {
          var duration = 2000 / 1000;
        }

        return {
          animation: 'start_progress ' + duration + 's',
          animationFillMode: 'forwards'
        };
      }
    },

    social_stories_box(index) {
      if (index == 0) {
        return 'display:block;';
      }

      return 'display:none;';
    },

    display_see_more() {
      this.styles.social_seemore_box.animation = '';

      if (this.stories[this.frame].seemore) {
        this.styles.social_seemore_box.display = 'block';
      } else {
        this.styles.social_seemore_box.display = 'none';
      }
    },

    display_header() {
      if (this.stories[this.frame].header) {
        this.render_header_component = this.stories[this.frame].header;
        this.$refs['box' + this.frame][0].style.display = 'block';
      } else {
        this.render_header_component = '';
        this.$refs['box' + this.frame][0].style.display = 'none';
      }
    },

    set_frame_duration() {
      if (this.stories[this.frame].duration) {
        var duration = this.stories[this.frame].duration / 1000;
      } else {
        var duration = 2000 / 1000;
      }

      this.$refs['progress' + this.frame][0].style.animation = 'start_progress ' + duration + 's';
      this.$refs['progress' + this.frame][0].style.animationFillMode = 'forwards';
    },

    set_frame_url() {
      this.display_header();

      if (this.stories[this.frame].url) {
        if (this.stories[this.frame].type == "image") {
          Object.assign(this.styles.social_stories_container_style, this.styles.default_social_stories_container_style);
          this.showVideo = false;
          this.styles.social_stories_container_style.backgroundImage = "url(" + this.stories[this.frame].url + ")";

          if (this.stories[this.frame].styles) {
            Object.assign(this.styles.social_stories_container_style, this.stories[this.frame].styles);
          }
        } else {
          Object.assign(this.styles.social_stories_container_style, this.styles.default_social_stories_container_style);
          this.styles.social_stories_container_style.backgroundImage = "";
          Object.assign(this.styles.social_video_frame_style, this.styles.default_social_video_frame_style);
          this.$refs['video_source'].src = this.stories[this.frame].url;
          this.styles.social_video_frame_style.height = 100 - document.getElementById('social_stories_progress_container').offsetHeight / this.height * 100 + "%";

          if (this.stories[this.frame].styles) {
            Object.assign(this.styles.social_video_frame_style, this.stories[this.frame].styles);
          }

          this.showVideo = true;
        }
      } else {
        Object.assign(this.styles.social_stories_container_style, this.styles.default_social_stories_container_style);
        this.styles.social_stories_container_style.backgroundImage = "";

        if (this.stories[this.frame].styles) {
          Object.assign(this.styles.social_stories_container_style, this.stories[this.frame].styles);
        }

        this.showVideo = false;
        this.$refs['box' + this.frame][0].style.display = 'block';
      }

      this.display_see_more();
    },

    start_progress() {
      this.set_frame_url();

      for (var i = 0; i < this.stories.length; i++) {
        this.$refs['progress' + i][0].addEventListener("animationend", () => {
          if (this.frame != this.stories.length - 1) {
            this.$refs['box' + this.frame][0].style.display = 'none';
          }

          this.frame++;

          if (this.frame <= this.stories.length - 1) {
            this.set_frame_url();
            this.set_frame_duration();
          } else {
            if (this.loop) {
              this.frame = 0;
              this.stop_all_animation();
              setTimeout(() => {
                var last_index = this.stories.length - 1;
                this.$refs['box' + last_index][0].style.display = 'none';
                this.set_frame_url();
                this.set_frame_duration();
              }, 500);
            }
          }
        });
      }
    }

  },

  mounted() {
    this.start_progress();
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    style: _vm.styles.vue_social_stories
  }, [_c('button', {
    style: _vm.styles.left_frame_button,
    on: {
      "click": function ($event) {
        return _vm.previous_frame();
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "80px",
      "id": "Layer_1",
      "data-name": "Layer 1",
      "viewBox": "0 0 122.88 111.27"
    }
  }, [_c('path', {
    attrs: {
      "fill": "white",
      "d": "M122.88,79.79H64.44V102c-.16,3.71-1.39,6.35-3.7,7.87-6.19,4.13-12.31-1.51-16.62-5.42C31.94,93.35,9.84,68.22,3.44,62.74c-4.59-4.15-4.59-10.06,0-14.21,6.61-5.66,30-32.16,41.85-42.71C49.41,2.16,55-2.37,60.74,1.44c2.31,1.53,3.54,4.17,3.7,7.88V31.47h58.44V79.79Z"
    }
  })])]), _vm._v(" "), _c('button', {
    style: _vm.styles.right_frame_button,
    on: {
      "click": function ($event) {
        return _vm.next_frame();
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "80px",
      "id": "Layer_1",
      "data-name": "Layer 1",
      "viewBox": "0 0 122.88 111.27"
    }
  }, [_c('path', {
    attrs: {
      "fill": "white",
      "d": "M0,31.47H58.44V9.32c.16-3.71,1.39-6.35,3.7-7.88C68.33-2.69,74.45,3,78.76,6.87,90.94,17.92,113,43.05,119.44,48.53c4.59,4.15,4.59,10.06,0,14.21-6.61,5.66-30,32.16-41.85,42.71-4.12,3.66-9.74,8.18-15.45,4.37-2.31-1.52-3.54-4.16-3.7-7.87V79.79H0V31.47Z"
    }
  })])]), _vm._v(" "), _c('div', {
    ref: 'social_stories_container',
    style: _vm.styles.social_stories_container_style,
    attrs: {
      "id": "social_stories_container"
    },
    on: {
      "click": function ($event) {
        return _vm.toogle_pause();
      }
    }
  }, [_c('div', {
    style: _vm.styles.social_stories_progress_container,
    attrs: {
      "id": "social_stories_progress_container"
    }
  }, _vm._l(_vm.stories, function (story, index) {
    return _c('div', {
      key: index,
      style: _vm.styles.social_stories_progress_box,
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return _vm.progress_click(index);
        }
      }
    }, [_c('div', {
      ref: 'progress' + index,
      refInFor: true,
      staticClass: "social_stories_progress",
      style: _vm.progress(index, story.duration)
    })]);
  }), 0), _vm._v(" "), _c('video', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showVideo,
      expression: "showVideo"
    }],
    ref: 'video_source',
    style: _vm.styles.social_video_frame_style,
    attrs: {
      "src": "",
      "autoplay": "",
      "muted": ""
    },
    domProps: {
      "muted": true
    },
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.toogle_video_pause();
      }
    }
  }), _vm._v(" "), _vm.fullscreenMode ? _c('button', {
    style: _vm.styles.fullscreen_button,
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.toogle_fullscreen();
      }
    }
  }, [!_vm.fullscreen ? _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:sketch": "http://www.bohemiancoding.com/sketch/ns",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "height": "20px",
      "version": "1.1",
      "viewBox": "0 0 14 14",
      "width": "20px"
    }
  }, [_c('g', {
    attrs: {
      "fill": "none",
      "fill-rule": "evenodd",
      "id": "Page-1",
      "stroke": "none",
      "stroke-width": "1"
    }
  }, [_c('g', {
    attrs: {
      "fill": "white",
      "id": "Core",
      "transform": "translate(-215.000000, -257.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "fullscreen",
      "transform": "translate(215.000000, 257.000000)"
    }
  }, [_c('path', {
    attrs: {
      "d": "M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z",
      "id": "Shape"
    }
  })])])])]) : _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:sketch": "http://www.bohemiancoding.com/sketch/ns",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "height": "20px",
      "version": "1.1",
      "viewBox": "0 0 14 14",
      "width": "20px"
    }
  }, [_c('g', {
    attrs: {
      "fill": "none",
      "fill-rule": "evenodd",
      "id": "Page-1",
      "stroke": "none",
      "stroke-width": "1"
    }
  }, [_c('g', {
    attrs: {
      "fill": "white",
      "id": "Core",
      "transform": "translate(-257.000000, -257.000000)"
    }
  }, [_c('g', {
    attrs: {
      "id": "fullscreen-exit",
      "transform": "translate(257.000000, 257.000000)"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0,11 L3,11 L3,14 L5,14 L5,9 L0,9 L0,11 L0,11 Z M3,3 L0,3 L0,5 L5,5 L5,0 L3,0 L3,3 L3,3 Z M9,14 L11,14 L11,11 L14,11 L14,9 L9,9 L9,14 L9,14 Z M11,3 L11,0 L9,0 L9,5 L14,5 L14,3 L11,3 L11,3 Z",
      "id": "Shape"
    }
  })])])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: 'see_more',
    style: _vm.styles.social_seemore_box
  }, [_c('div', {
    style: _vm.styles.social_seemore_box_inner
  }, [_c('div', {
    style: _vm.styles.social_seemore,
    attrs: {
      "title": "See More"
    },
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.seemore_click();
      }
    }
  }, [_c('a', {
    staticStyle: {
      "padding": "4px"
    }
  }, [!_vm.arrowClick ? _c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 240.835 240.835"
    },
    attrs: {
      "version": "1.1",
      "id": "Capa_1",
      "width": "40%",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 240.835 240.835",
      "xml:space": "preserve"
    }
  }, [_c('path', {
    style: _vm.styles.arrow_style,
    attrs: {
      "id": "Expand_Less",
      "d": "M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155\n              c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155\n              L129.007,57.819z"
    }
  }), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g')]) : _c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 330 330"
    },
    attrs: {
      "version": "1.1",
      "id": "Layer_1",
      "width": "40%",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 330 330",
      "xml:space": "preserve"
    }
  }, [_c('path', {
    style: _vm.styles.arrow_style,
    attrs: {
      "id": "XMLID_225_",
      "d": "M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393\n              c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393\n              s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
    }
  }), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g'), _c('g')])])]), _vm._v(" "), _c('p', {
    style: _vm.styles.see_more_text
  }, [_vm._v("See More")])]), _vm._v(" "), _c(_vm.render_seemore_component, {
    tag: "div",
    style: _vm.styles.see_more_content
  })], 1), _vm._v(" "), _vm._l(_vm.stories, function (story, index) {
    return _c('div', {
      key: index,
      ref: 'box' + index,
      refInFor: true,
      staticClass: "social_stories_box",
      style: _vm.social_stories_box(index)
    }, [story.header ? _c(_vm.render_header_component, {
      tag: "div",
      staticClass: "social_stories_box_heading"
    }) : _vm._e()], 1);
  })], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-33f93f49_0", {
    source: ".social_stories_progress{background:#fff;width:0%;height:100%}@keyframes start_progress{from{width:0%}to{width:100%}}.social_stories_box{padding:1px 20px}.social_stories_box_heading{font-family:Arial,Helvetica,sans-serif;margin-top:10%}.social_seemore{height:100%;width:100%;background:#fff;border:1px solid #fff;border-radius:50%;display:flex;justify-content:center;align-items:center}.social_seemore path{fill:#000}.social_seemore a{color:#fff;text-decoration:none;font-size:12px;width:100%;text-align:center}.social_seemore_box{display:none;justify-content:center;position:absolute;width:100%;height:15%;background:0 0;bottom:0}@keyframes slideup{from{height:15%;background:0 0}to{height:100%;background:#fff}}@keyframes slidedown{from{height:100%;background:#fff}to{height:15%;background:0 0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueSocialMediaStories', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
