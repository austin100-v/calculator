# Calculator App

## Description

A web-based calculator that mimics the behavior of a real calculator. It supports:

- Multiple operations in one expression (`5+3*2`)
- Operator precedence (`* / %` before `+ -`)
- Continuous calculations without pressing `=` each time
- Prevents multiple decimal points per number
- Keyboard and button support
- Error handling (division by zero)

Implemented using **HTML**, **CSS**, and **JavaScript**, and avoids using `eval()` for security and accuracy.

---

## Features

- **Standard operations:** `+`, `-`, `*`, `/`, `%`
- **Decimal support:** Only one `.` per number
- **Delete (DEL):** Remove last character or operator
- **Clear (C):** Reset the calculator
- **Keyboard support:**
  - Numbers: `0–9`
  - Operators: `+ - * / %`
  - `Enter` / `=` → calculate result
  - `Backspace` → delete last
  - `C` → clear all
- **Error handling:** Detects division by zero

---

## How It Works

### 1. Number Input
- Clicking a number or typing it via keyboard appends it to the current number.
- A decimal point can only be added once per number.

### 2. Operator Input
- Clicking an operator or typing it via keyboard adds it to the expression.
- Consecutive operators are replaced by the last one (e.g., `5 + * 3` → `5 * 3`).
- The calculator allows starting with `-` for negative numbers.

### 3. Delete (DEL)
- Deletes the last character from the current number, or removes the last operator if a single character.

### 4. Clear (C)
- Clears the entire expression and resets the display.

### 5. Calculation Engine
- The calculator parses the expression without using `eval()`.
- **Step 1:** Solve `*`, `/`, `%` from left to right.
- **Step 2:** Solve `+` and `-` from left to right.
- Result is displayed and can be used for the next operation.

---

## Usage

1. Open `index.html` in your browser.
2. Use the on-screen buttons or keyboard to input numbers and operators.
3. Press `=` or `Enter` to calculate the result.
4. Press `DEL` or `Backspace` to delete the last character.
5. Press `C` to clear all.

---

## Examples

```
Input:  5 + 3 * 2
Step 1 (multiplication): 5 + 6
Step 2 (addition): 11
Output: 11
```

```
Input:  -7 + 2
Output: -5
```

```
Input:  5 / 0
Output: Error: Division by zero
```

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Calculator layout |
| `calculator.css` | Styling |
| `calculator.js` | Logic and keyboard support |

---

## Future Improvements

- Add parentheses support for complex expressions
- Add memory functions (M+, M-, MR)
- Add a dark/light theme toggle