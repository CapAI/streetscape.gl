// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import { Popover, Tooltip } from './index';
storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Popover', function () {
  return React.createElement(Popover, {
    content: function content() {
      return React.createElement("div", {
        style: {
          padding: '10px'
        }
      }, React.createElement("div", null, React.createElement("button", null, "One fish")), React.createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, React.createElement("button", null, "Two fish")), React.createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, React.createElement("button", null, "Red fish")), React.createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, React.createElement("button", null, "Blue fish")));
    }
  }, React.createElement("button", null, "Click for popover"));
}).add('Tooltip', function () {
  return React.createElement("div", {
    style: {
      fontFamily: 'Helvetica, sans-serif',
      margin: 100,
      fontSize: 13
    }
  }, React.createElement("p", null, React.createElement(Tooltip, {
    position: Popover.RIGHT,
    content: "Tooltip"
  }, "Right")), React.createElement("p", null, React.createElement(Tooltip, {
    position: Popover.BOTTOM,
    content: "Tooltip"
  }, "Bottom")), React.createElement("p", null, React.createElement(Tooltip, {
    position: Popover.LEFT,
    content: "Tooltip"
  }, "Left")), React.createElement("p", null, React.createElement(Tooltip, {
    position: Popover.TOP,
    content: "Tooltip"
  }, "Top")), React.createElement("p", null, React.createElement(Tooltip, {
    position: Popover.RIGHT,
    arrowPosition: Popover.BOTTOM,
    content: function content() {
      return React.createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim vel pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat sem.");
    }
  }, React.createElement("span", null, "Custom positioning"))));
});
//# sourceMappingURL=stories.js.map