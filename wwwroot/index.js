"use strict";
var Kaboom2;
(function (Kaboom2) {
    var wwwroot;
    (function (wwwroot) {
        class Index {
            static addParagraph() {
                let divApp = (document.getElementById('divApp'));
                for (let i = 0; i < 200; i++) {
                    let p = document.createElement('p');
                    p.innerText = `TypeScript ${i} --- allo`;
                    divApp.appendChild(p);
                }
                const nodeList = document.querySelectorAll('p');
                const array = Array.from(nodeList);
                let array2 = array.filter((element) => {
                    return element.innerText.indexOf('33') > -1;
                });
                let divFound = (document.getElementById('divFound'));
                for (let i = 0; i < array2.length; i++) {
                    let p = document.createElement('div');
                    p.innerText = `Found ${array2[i].innerText}`;
                    divFound.appendChild(p);
                }
            }
            static DitBonjour() {
                alert('Bonjour');
            }
        }
        wwwroot.Index = Index;
        // Call the method to add the paragraph when the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            Index.addParagraph();
            Index.DitBonjour();
        });
    })(wwwroot = Kaboom2.wwwroot || (Kaboom2.wwwroot = {}));
})(Kaboom2 || (Kaboom2 = {}));
