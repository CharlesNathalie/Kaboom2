namespace Kaboom2.wwwroot {
    export class Index {
        public static addParagraph() {
            let divApp: HTMLDivElement = (document.getElementById('divApp')) as HTMLDivElement;

            for (let i = 0; i < 200; i++) {
                let p: HTMLParagraphElement = document.createElement('p');
                p.innerText = `TypeScript ${i} --- allo`;

                divApp.appendChild(p);
            }

            const nodeList: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('p');
            const array: HTMLParagraphElement[] = Array.from(nodeList) as HTMLParagraphElement[];

            let array2 = array.filter((element: HTMLParagraphElement) => {
                return element.innerText.indexOf('33') > -1;
            });

            let divFound: HTMLDivElement = (document.getElementById('divFound')) as HTMLDivElement;

            for (let i = 0; i < array2.length; i++) {
                let p = document.createElement('div');
                p.innerText = `Found ${array2[i].innerText}`;

                divFound.appendChild(p);
            }
        }

        public static DitBonjour() {
            alert('Bonjour');
        }
    }


    // Call the method to add the paragraph when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        Index.addParagraph();
        Index.DitBonjour();
    });
}
