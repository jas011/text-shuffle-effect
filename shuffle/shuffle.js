! function(n, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Splitting = t()
}(this, function() {
	"use strict"
	var u = document,
		a = u.createTextNode.bind(u)

	function l(n, t, e) {
		n.style.setProperty(t, e)
	}

	function f(n, t) {
		return n.appendChild(t)
	}

	function d(n, t, e, r) {
		var o = u.createElement("span")
		return t && (o.className = t), e && (r || o.setAttribute("data-" + t, e), o.textContent = e), n && f(n, o) || o
	}

	function p(n, t) {
		return n.getAttribute("data-" + t)
	}

	function m(n, t) {
		return n && 0 != n.length ? n.nodeName ? [n] : [].slice.call(n[0].nodeName ? n : (t || u).querySelectorAll(n)) : []
	}

	function i(n) {
		for (var t = []; n--;) t[n] = []
		return t
	}

	function h(n, t) {
		n && n.some(t)
	}

	function o(t) {
		return function(n) {
			return t[n]
		}
	}
	var c = {}

	function n(n, t, e, r) {
		return {
			by: n,
			depends: t,
			key: e,
			split: r
		}
	}

	function e(n) {
		return function t(e, n, r) {
			var o = r.indexOf(e)
			if (-1 == o) {
				r.unshift(e)
				var u = c[e]
				if (!u) throw new Error("plugin not loaded: " + e)
				h(u.depends, function(n) {
					t(n, e, r)
				})
			} else u = r.indexOf(n), r.splice(o, 1), r.splice(u, 0, e)
			return r
		}(n, 0, []).map(o(c))
	}

	function t(n) {
		c[n.by] = n
	}

	function g(n, e, r, o, u) {
		n.normalize()
		var i = [],
			c = document.createDocumentFragment(),
			s = (o && i.push(n.previousSibling), [])
		return m(n.childNodes).some(function(n) {
			var t
			n.tagName && !n.hasChildNodes() ? s.push(n) : n.childNodes && n.childNodes.length ? (s.push(n), i.push.apply(i, g(n, e, r, o, u))) : (t = (n = n.wholeText || "").trim()).length && (" " === n[0] && s.push(a(" ")), h("" === r && "function" == typeof Intl.Segmenter ? Array.from((new Intl.Segmenter).segment(t)).map(function(n) {
				return n.segment
			}) : t.split(r), function(n, t) {
				t && u && s.push(d(c, "whitespace", " ", u))
				t = d(c, e, n)
				i.push(t), s.push(t)
			}), " " === n[n.length - 1]) && s.push(a(" "))
		}), h(s, function(n) {
			f(c, n)
		}), n.innerHTML = "", f(n, c), i
	}
	var v = 0
	var s = "words",
		r = n(s, v, "word", function(n) {
			return g(n, "word", /\s+/, 0, 1)
		}),
		y = "chars",
		w = n(y, [s], "char", function(n, e, t) {
			var r = []
			return h(t[s], function(n, t) {
				r.push.apply(r, g(n, "char", "", e.whitespace && t))
			}), r
		})

	function b(t) {
		var a = (t = t || {}).key
		return m(t.target || "[data-splitting]").map(function(i) {
			var n, c, s = i["🍌"]
			return !t.force && s || (s = i["🍌"] = {
				el: i
			}, n = e(n = (n = t.by || p(i, "splitting")) && "true" != n ? n : y), c = function(n, t) {
				for (var e in t) n[e] = t[e]
				return n
			}({}, t), h(n, function(n) {
				var t, e, r, o, u
				n.split && (t = n.by, r = (a ? "-" + a : "") + n.key, n = n.split(i, c, s), r && (e = i, u = (r = "--" + (r = r)) + "-index", h(o = n, function(n, t) {
					Array.isArray(n) ? h(n, function(n) {
						l(n, u, t)
					}) : l(n, u, t)
				}), l(e, r + "-total", o.length)), s[t] = n, i.classList.add(t))
			}), i.classList.add("splitting")), s
		})
	}

	function N(n, t, e) {
		var t = m(t.matching || n.children, n),
			r = {}
		return h(t, function(n) {
			var t = Math.round(n[e]);
			(r[t] || (r[t] = [])).push(n)
		}), Object.keys(r).map(Number).sort(x).map(o(r))
	}

	function x(n, t) {
		return n - t
	}
	b.html = function(n) {
		var t = (n = n || {}).target = d()
		return t.innerHTML = n.content, b(n), t.outerHTML
	}
	var S = n("lines", [s], "line", function(n, t, e) {
			return N(n, {
				matching: e[s]
			}, "offsetTop")
		}),
		T = n("items", v, "item", function(n, t) {
			return m(t.matching || n.children, n)
		}),
		A = n("rows", v, "row", function(n, t) {
			return N(n, t, "offsetTop")
		}),
		L = n("cols", v, "col", function(n, t) {
			return N(n, t, "offsetLeft")
		}),
		k = n("grid", ["rows", "cols"]),
		C = "layout",
		M = n(C, v, v, function(n, t) {
			for (var e, r = t.rows = +(t.rows || p(n, "rows") || 1), o = t.columns = +(t.columns || p(n, "columns") || 1), u = (t.image = t.image || p(n, "image") || n.currentSrc || n.src, t.image && (e = m("img", n)[0], t.image = e && (e.currentSrc || e.src)), t.image && l(n, "background-image", "url(" + t.image + ")"), r * o), i = [], c = d(v, "cell-grid"); u--;) {
				var s = d(c, "cell")
				d(s, "cell-inner"), i.push(s)
			}
			return f(n, c), i
		}),
		H = n("cellRows", [C], "row", function(n, t, e) {
			var r = t.rows,
				o = i(r)
			return h(e[C], function(n, t, e) {
				o[Math.floor(t / (e.length / r))].push(n)
			}), o
		}),
		O = n("cellColumns", [C], "col", function(n, t, e) {
			var r = t.columns,
				o = i(r)
			return h(e[C], function(n, t) {
				o[t % r].push(n)
			}), o
		}),
		j = n("cells", ["cellRows", "cellColumns"], "cell", function(n, t, e) {
			return e[C]
		})
	return (b.add = t)(r), t(w), t(S), t(T), t(A), t(L), t(k), t(M), t(H), t(O), t(j), b
})



// shuffle class ::->



const randomNumber = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// Class representing one line
class Line {
	// line position
	position = -1;
	// cells/chars
	cells = [];

	// Constructor - the char element (<span>)
	constructor(linePosition) {
		this.position = linePosition;
	}
}

// Class representing one cell/char
class Cell {
	// DOM elements
	DOM = {
		// the char element (<span>)
		el: null
	};
	// cell position
	position = -1;
	// previous cell position
	previousCellPosition = -1;
	// original innerHTML
	original;
	// current state/innerHTML
	state;
	color;
	originalColor;
	// cached values
	cache;

	constructor(DOM_el, {
		position,
		previousCellPosition
	} = {}) {
		this.DOM.el = DOM_el;
		this.original = this.DOM.el.innerHTML;
		this.state = this.original;
		this.color = this.originalColor = getComputedStyle(
			document.documentElement
		).getPropertyValue("--color-text");
		this.position = position;
		this.previousCellPosition = previousCellPosition;
	}

	set(value) {
		this.state = value;
		this.DOM.el.innerHTML = this.state;
	}
}

// Class representing the TypeShuffle object
class TypeShuffle {
	// DOM elements
	DOM = {
		// the main text element
		el: null
	};
	// array of Line objs
	lines = [];
	// array of letters and symbols
	lettersAndSymbols = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"!",
		"@",
		"#",
		"$",
		"&",
		"*",
		"(",
		")",
		"-",
		"_",
		"+",
		"=",
		"/",
		"[",
		"]",
		"{",
		"}",
		";",
		":",
		"<",
		">",
		",",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9"
	];
	// effects and respective methods
	effects = {
		fx1: () => this.fx1(),
		fx2: () => this.fx2(),
		fx3: () => this.fx3(),
		fx4: () => this.fx4(),
		fx5: () => this.fx5(),
		fx6: () => this.fx6()
	};
	totalChars = 0;

	/**
	 * Constructor.
	 * @param {Element} DOM_el - main text element
	 */
	constructor(DOM_el) {
		this.DOM.el = DOM_el;
		// Apply Splitting (two times to have lines, words and chars)
		const results = Splitting({
			target: this.DOM.el,
			by: "lines"
		});
		results.forEach((s) => Splitting({
			target: s.words
		}));

		// for every line
		for (const [linePosition, lineArr] of results[0].lines.entries()) {
			// create a new Line
			const line = new Line(linePosition);
			let cells = [];
			let charCount = 0;
			// for every word of each line
			for (const word of lineArr) {
				// for every character of each line
				for (const char of [...word.querySelectorAll(".char")]) {
					cells.push(
						new Cell(char, {
							position: charCount,
							previousCellPosition: charCount === 0 ? -1 : charCount - 1
						})
					);
					++charCount;
				}
			}
			line.cells = cells;
			this.lines.push(line);
			this.totalChars += charCount;
		}

		// TODO
		// window.addEventListener('resize', () => this.resize());
	}

	// clear all the cells chars
	clearCells() {
		for (const line of this.lines) {
			for (const cell of line.cells) {
				cell.set("&nbsp;");
			}
		}
	}
	/**
	 *
	 * @returns {string} a random char from this.lettersAndSymbols
	 */
	getRandomChar() {
		return this.lettersAndSymbols[
			Math.floor(Math.random() * this.lettersAndSymbols.length)
		];
	}
	/**
	 * Effect 1 - clear cells and animate each line cells (delays per line and per cell)
	 */
	fx1() {
		// max iterations for each cell to change the current value
		const MAX_CELL_ITERATIONS = 45;

		let finished = 0;

		// clear all cells values
		this.clearCells();

		// cell's loop animation
		// each cell will change its value MAX_CELL_ITERATIONS times
		const loop = (line, cell, iteration = 0) => {
			// cache the previous value
			cell.cache = cell.state;

			// set back the original cell value if at the last iteration
			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.set(cell.original);
				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			}
			// if the cell is the first one in its line then generate a random char
			else if (cell.position === 0) {
				// show specific characters for the first 9 iterations (looks cooler)
				cell.set(
					iteration < 9 ?
					["*", "-", "\u0027", "\u0022"][Math.floor(Math.random() * 4)] :
					this.getRandomChar()
				);
			}
			// get the cached value of the previous cell.
			// This will result in the illusion that the chars are sliding from left to right
			else {
				cell.set(line.cells[cell.previousCellPosition].cache);
			}

			// doesn't count if it's an empty space
			if (cell.cache != "&nbsp;") {
				++iteration;
			}

			// repeat...
			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), 15);
			}
		};

		// set delays for each cell animation
		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(() => loop(line, cell), (line.position + 1) * 200);
			}
		}
	}
	fx2() {
		const MAX_CELL_ITERATIONS = 20;
		let finished = 0;
		const loop = (line, cell, iteration = 0) => {
			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.set(cell.original);
				cell.DOM.el.style.opacity = 0;
				setTimeout(() => {
					cell.DOM.el.style.opacity = 1;
				}, 300);

				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			} else {
				cell.set(this.getRandomChar());
			}

			++iteration;
			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), 40);
			}
		};

		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(() => loop(line, cell), (cell.position + 1) * 30);
			}
		}
	}
	fx3() {
		const MAX_CELL_ITERATIONS = 10;
		let finished = 0;
		this.clearCells();

		const loop = (line, cell, iteration = 0) => {
			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.set(cell.original);
				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			} else {
				cell.set(this.getRandomChar());
			}

			++iteration;
			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), 80);
			}
		};

		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(() => loop(line, cell), randomNumber(0, 2000));
			}
		}
	}
	fx4() {
		const MAX_CELL_ITERATIONS = 30;
		let finished = 0;
		this.clearCells();

		const loop = (line, cell, iteration = 0) => {
			cell.cache = cell.state;

			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.set(cell.original);

				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			} else if (cell.position === 0) {
				cell.set(["*", ":"][Math.floor(Math.random() * 2)]);
			} else {
				cell.set(line.cells[cell.previousCellPosition].cache);
			}

			if (cell.cache != "&nbsp;") {
				++iteration;
			}

			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), 15);
			}
		};

		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(
					() => loop(line, cell),
					Math.abs(this.lines.length / 2 - line.position) * 400
				);
			}
		}
	}
	fx5() {
		// max iterations for each cell to change the current value
		const MAX_CELL_ITERATIONS = 30;
		let finished = 0;
		this.clearCells();

		const loop = (line, cell, iteration = 0) => {
			cell.cache = {
				state: cell.state,
				color: cell.color
			};

			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.color = cell.originalColor;
				cell.DOM.el.style.color = cell.color;
				cell.set(cell.original);

				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			} else if (cell.position === 0) {
				cell.color = ["#3e775d", "#61dca3", "#61b3dc"][
					Math.floor(Math.random() * 3)
				];
				cell.DOM.el.style.color = cell.color;
				cell.set(
					iteration < 9 ?
					["*", "-", "\u0027", "\u0022"][Math.floor(Math.random() * 4)] :
					this.getRandomChar()
				);
			} else {
				cell.set(line.cells[cell.previousCellPosition].cache.state);

				cell.color = line.cells[cell.previousCellPosition].cache.color;
				cell.DOM.el.style.color = cell.color;
			}

			if (cell.cache.state != "&nbsp;") {
				++iteration;
			}

			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), 10);
			}
		};

		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(() => loop(line, cell), (line.position + 1) * 200);
			}
		}
	}
	fx6() {
		// max iterations for each cell to change the current value
		const MAX_CELL_ITERATIONS = 15;
		let finished = 0;
		const loop = (line, cell, iteration = 0) => {
			cell.cache = {
				state: cell.state,
				color: cell.color
			};

			if (iteration === MAX_CELL_ITERATIONS - 1) {
				cell.set(cell.original);

				cell.color = cell.originalColor;
				cell.DOM.el.style.color = cell.color;

				++finished;
				if (finished === this.totalChars) {
					this.isAnimating = false;
				}
			} else {
				cell.set(this.getRandomChar());

				cell.color = ["#2b4539", "#61dca3", "#61b3dc"][
					Math.floor(Math.random() * 3)
				];
				cell.DOM.el.style.color = cell.color;
			}

			++iteration;
			if (iteration < MAX_CELL_ITERATIONS) {
				setTimeout(() => loop(line, cell, iteration), randomNumber(30, 110));
			}
		};

		for (const line of this.lines) {
			for (const cell of line.cells) {
				setTimeout(() => loop(line, cell), (line.position + 1) * 80);
			}
		}
	}
	/**
	 * call the right effect method (defined in this.effects)
	 * @param {string} effect - effect type
	 */
	trigger(effect = "fx1") {
		if (!(effect in this.effects) || this.isAnimating) return;
		this.isAnimating = true;
		this.effects[effect]();
	}
}