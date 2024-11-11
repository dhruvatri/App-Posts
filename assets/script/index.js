var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
var postArray;
var posts = [];
var postId = 0;
function setItems() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('postId', postId.toString());
}
function getItems() {
    posts = JSON.parse(localStorage.getItem('posts') || '[]');
    postId = parseInt(localStorage.getItem('postId') || '0');
}
function displayPost() {
    var _a;
    var postElement = document.createElement('div');
    postElement.className = 'post';
    var uniqueIdentity = "post" + postId;
    postElement.innerHTML = "\n    <h1 class=\"post-title\">".concat(posts[postId].title, "</h1>\n    <button id=").concat(uniqueIdentity, " class=\"close\">X</button>\n    <p class=\"post-body\">").concat(posts[postId].body.replace(/\n/g, '<br>'), "</p>");
    (_a = document.querySelector("#postArea")) === null || _a === void 0 ? void 0 : _a.appendChild(postElement);
    // Open modal when the close button is clicked
    var closeButton = document.getElementById(uniqueIdentity);
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', function () {
        SurePage(postElement);
    });
}
function SurePage(postElement) {
    var modal = document.getElementById("myModal");
    var yesButton = document.getElementById("yesButton");
    // Display the modal using 'flex' to match CSS
    if (modal)
        modal.style.display = "flex";
    // Remove previous onclick event to prevent multiple event listeners
    if (yesButton) {
        yesButton.onclick = null; // Remove any previous event listener
        yesButton.onclick = function () {
            deletePost(postElement);
        };
    }
}
function initializeModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("closeBtn")[0];
    var noButton = document.getElementById("noButton");
    // When the user clicks on <span> (x) or "No" button, close the modal
    var closeModal = function () {
        if (modal)
            modal.style.display = "none";
    };
    if (span) {
        span.onclick = closeModal;
    }
    if (noButton) {
        noButton.onclick = closeModal;
    }
    // When the user clicks outside the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            if (modal)
                modal.style.display = "none";
        }
    };
}
function deletePost(postElement) {
    var _a;
    var postIndex = Array.from(document.querySelectorAll('.post')).indexOf(postElement);
    if (postIndex !== -1) {
        // Remove the post from the `posts` array
        posts.splice(postIndex, 1);
        // Update localStorage
        setItems();
        // Remove the post element from the DOM
        (_a = document.querySelector("#postArea")) === null || _a === void 0 ? void 0 : _a.removeChild(postElement);
        // Close the modal
        var modal_1 = document.getElementById("myModal");
        if (modal_1)
            modal_1.style.display = "none";
    }
    var modal = document.getElementById("myModal");
    if (modal)
        modal.style.display = "none";
}
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(postId === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/posts')];
                case 1:
                    postArray = _a.sent();
                    return [4 /*yield*/, postArray.json()];
                case 2:
                    posts = _a.sent();
                    setItems();
                    _a.label = 3;
                case 3:
                    if (postId < posts.length) {
                        displayPost();
                        postId++;
                        setItems();
                    }
                    else {
                        alert("No more posts to display");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
window.onload = function () {
    initializeModal(); // Set up modal event listeners
    getItems();
    var tempId = postId;
    postId = 0;
    for (var i = 0; i < tempId; i++) {
        displayPost();
        postId++;
    }
};
(_a = document.querySelector("#addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', fetchPosts);
(_b = document.querySelector("#refreshButton")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var postArea = document.querySelector("#postArea");
    if (postArea) {
        postArea.innerHTML = ""; // Clear the inner HTML only if postArea exists
    }
    posts = [];
    postId = 0;
    localStorage.clear();
    location.reload();
});
