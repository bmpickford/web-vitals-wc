# web-vitals-wc React Example
This contains a simple CRA template with web vitals embedded.

## Starting
```bash
yarn start
```

### Integration
Import the element
```javascript
// file: src/index.js
import 'web-vitals-wc/index';
```

Use and position the element
```javascript
// file: src/App.js
// ...
render() {
    // template code
    <div class="web-vitals">
        <web-vitals-wc></web-vitals-wc>
    </div>
    // template code
}
```