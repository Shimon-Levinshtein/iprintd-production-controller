const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const mysql = require('mysql2');


class FnFs {
    constructor() {
    }

    contentFolder(locשtion) {
        try {
            fs.readdirSync(this.fixPath(locשtion, true))
        } catch (arr) {
            const result = `
                    <form action="/management-it-fs/cd" method="post" >
                        Please enter the path of your desktop: <input type="text" name="path"><br>
                        <input type="submit" value="Ok">
                    </form>
            `
            return result;

        }

        let result = ``;
        locשtion = this.fixPath(locשtion, true);
        const arr = fs.readdirSync(locשtion);
        for (let index of arr) {

            try {
                let test = fs.statSync(locשtion + '/' + index);

                if (test.isFile()) {
                    result += `
                <li><div class="li-folder">
                    <div class='hand-shape unicode-file'>📰</div>
                    <div class='path-name'>${index}</div> 
                    <a href="/management-it-fs/duplicate/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape duplicate'>duplicate</a>
                    <a href=" /management-it-fs/cd/${this.fixPath(this.cutLastDir(locשtion), false)}" class="back-cd hand-shape">↺</a>
                    <a href="/management-it-fs/delete/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape garbage-can'>🗑️</a>
                </div></li>`
                }
                if (test.isDirectory()) {
                    result += `
                <li><div class="li-folder">
                <a href="/management-it-fs/cd/${this.fixPath(locשtion + '/' + index, false)}" class='unicode-folder'>📁</a>
                <div class='path-name'>${index}</div> 
                <a href="/management-it-fs/duplicate/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape duplicate'>duplicate</a>
                <a href="/management-it-fs/cd/${this.fixPath(this.cutLastDir(locשtion), false)}" class="back-cd hand-shape">↺</a>
                <a href="/management-it-fs/delete/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape garbage-can'>🗑️</a>
                </div></li>`
                }
            } catch (arr) {
                result += `
                <li><div class="li-folder">
                <div class='hand-shape unicode-file'>📰</div>
                <div class='path-name'>${index}</div> 
                <a href="/management-it-fs/duplicate/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape duplicate'>duplicate</a>
                <a href=" /management-it-fs/cd/${this.fixPath(this.cutLastDir(locשtion), false)}" class="back-cd hand-shape">↺</a>
                <a href="/management-it-fs/delete/${this.fixPath(locשtion + '/' + index, false)}" class='hand-shape garbage-can'>🗑️</a>
            </div></li>`
            }
        };
        return result;
    }

    fixPath(str, bol) {
        const arr = str.split('');
        if (bol) {
            for (let index in arr) {
                if (arr[index] == '~') {
                    arr[index] = '/';
                }
            }
        } else {
            for (let index in arr) {
                if (arr[index] == '/') {
                    arr[index] = '~';
                }
                if (arr[index].charCodeAt(0) == '92') {
                    arr[index] = '~';
                }

            }
        }
        return arr.join('')
    }

    cutLastDir(str) {
        if(str == 'C:') {
            console.log('********** --> ' + str + '/' );
            return str + '/';
        }
        const arr = str.split('');
        const index = function () {
            for (let i = arr.length; i > 0; i--) {
                if (arr[i] == '/') return i;
            }
        }
        return str.slice(0, index());
    }

    duplicate(path) {
        
        try {
            fsExtra.copySync(path, path + ' - Copy')
        } catch (err) {
            console.error(err)
        }
    }

    delete(path) {
        // fsExtra.removeSync(path);
    }
    readFile(path) {
        fs.readFile(path, 'utf8', function (err, data) {
            console.log(data);
        })
    }
}



module.exports = new FnFs();




