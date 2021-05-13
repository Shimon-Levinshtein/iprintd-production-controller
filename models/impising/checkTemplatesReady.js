const fs = require("fs");

class checkTemplatesReady {
    constructor() {

    }

    calculator() {

        const oldSizesArr = [
            "000-rc-s&r-16x23-simplex",
            "000-rc-s&r-16x23-simplex",
            "000-rc-s&r-16x23-simplex",
            "000-rc-s&r-1x1-simplex",
            "000-rc-s&r-1x10-simplex",
            "000-rc-s&r-1x2-simplex",
            "000-rc-s&r-2x2-simplex",
            "000-rc-s&r-2x3-simplex",
            "000-rc-s&r-2x4-simplex",
            "000-rc-s&r-2x6-simplex",
            "000-rc-s&r-2x7-simplex",
            "000-rc-s&r-2x9-simplex",
            "000-rc-s&r-3x12-simplex",
            "000-rc-s&r-3x3-simplex",
            "000-rc-s&r-3x3-simplex",
            "000-rc-s&r-3x5-simplex",
            "000-rc-s&r-3x6-simplex",
            "000-rc-s&r-3x8-simplex",
            "000-rc-s&r-3x9-simplex",
            "000-rc-s&r-4x10-simplex",
            "000-rc-s&r-4x12-simplex",
            "000-rc-s&r-4x4-simplex",
            "000-rc-s&r-4x5-simplex",
            "000-rc-s&r-4x6-simplex",
            "000-rc-s&r-5x14-simplex",
            "000-rc-s&r-5x5-simplex",
            "000-rc-s&r-5x6-simplex",
            "000-rc-s&r-5x8-simplex",
            "000-rc-s&r-6x11-simplex",
            "000-rc-s&r-6x13-simplex",
            "000-rc-s&r-6x5-simplex",
            "000-rc-s&r-6x6-simplex",
            "000-rc-s&r-6x7-simplex",
            "000-rc-s&r-6x8-simplex",
            "000-rc-s&r-6x9-simplex",
            "000-rc-s&r-7x11-simplex",
            "000-rc-s&r-7x12-simplex",
            "000-rc-s&r-7x14-simplex",
            "000-rc-s&r-7x15-simplex",
            "000-rc-s&r-7x6-simplex",
            "000-rc-s&r-7x9-simplex",
            "000-rc-s&r-8x10-simplex",
            "000-rc-s&r-8x18-simplex",
            "000-rc-s&r-8x19-simplex",
            "000-rc-s&r-8x8-simplex",
            "000-rc-s&r-8x9-simplex",
            "000-rc-s&r-9x9-simplex",
            "001-rc-s&r-10x1-simplex",
            "001-rc-s&r-10x4-simplex",
            "001-rc-s&r-10x8-simplex",
            "001-rc-s&r-11x6-simplex",
            "001-rc-s&r-11x7-simplex",
            "001-rc-s&r-12x3-simplex",
            "001-rc-s&r-12x4-simplex",
            "001-rc-s&r-12x7-simplex",
            "001-rc-s&r-13x6-simplex",
            "001-rc-s&r-14x5-simplex",
            "001-rc-s&r-15x7-simplex",
            "001-rc-s&r-18x8-simplex",
            "001-rc-s&r-19x8-simplex ",
            "001-rc-s&r-23x16-simplex  ",
            "001-rc-s&r-2x1-simplex",
            "001-rc-s&r-3x2-simplex",
            "001-rc-s&r-4x2-simplex",
            "001-rc-s&r-5x3-simplex",
            "001-rc-s&r-5x4-simplex",
            "001-rc-s&r-6x2-simplex",
            "001-rc-s&r-6x3-simplex",
            "001-rc-s&r-6x4-simplex",
            "001-rc-s&r-7x2-simplex",
            "001-rc-s&r-8x3-simplex",
            "001-rc-s&r-8x5-simplex",
            "001-rc-s&r-8x6-simplex",
            "001-rc-s&r-9x2-simplex",
            "001-rc-s&r-9x3-simplex",
            "001-rc-s&r-9x6-simplex",
            "001-rc-s&r-9x7-simplex",
            "001-rc-s&r-9x8-simplex",
            "002-rc-s&r-14x2-simplex",
            "002-rc-s&r-2x14-simplex",
        ];
        const allTemplates = [
            "10x12",
            "10x14",
            "10x15",
            "11x11",
            "11x14",
            "12x19",
            "12x20",
            "14x20",
            "1x1",
            "1x10",
            "1x11",
            "1x12",
            "1x13",
            "1x16",
            "1x2",
            "1x3",
            "1x4",
            "1x5",
            "1x6",
            "1x7",
            "1x8",
            "1x9",
            "2x10",
            "2x11",
            "2x12",
            "2x19",
            "2x2",
            "2x3",
            "2x4",
            "2x5",
            "2x6",
            "2x7",
            "2x8",
            "2x9",
            "3x10",
            "3x11",
            "3x12",
            "3x13",
            "3x16",
            "3x3",
            "3x4",
            "3x5",
            "3x6",
            "3x7",
            "3x8",
            "3x9",
            "4x10",
            "4x11",
            "4x13",
            "4x20",
            "4x4",
            "4x5",
            "4x6",
            "4x7",
            "4x8",
            "4x9",
            "5x10",
            "5x11",
            "5x12",
            "5x13",
            "5x19",
            "5x5",
            "5x6",
            "5x7",
            "5x8",
            "5x9",
            "6x10",
            "6x11",
            "6x14",
            "6x16",
            "6x6",
            "6x7",
            "6x8",
            "6x9",
            "7x10",
            "7x11",
            "7x12",
            "7x13",
            "7x15",
            "7x21",
            "7x7",
            "7x8",
            "7x9",
            "8x10",
            "8x11",
            "8x12",
            "8x13",
            "8x8",
            "8x9",
            "9x10",
            "9x11",
            "9x13",
            "9x14",
            "9x16",
            "9x9",
        ];
        console.log('****************************************');

        // for (let index = 0; index < sizesArr.length; index++) {
        //     const element = sizesArr[index];
        //     let newIndex = index + 1;
        //     fs.mkdir('C:/Users/Dudu-PT/Desktop/TestImFolder/' + newIndex  + '/Original' , { recursive: true }, function (err) {
        //         if (err) console.log(err);
        //     });
        //     fs.copyFile('C:/Users/Dudu-PT/Desktop/TestImFolder/test.pdf', 'C:/Users/Dudu-PT/Desktop/TestImFolder/' + newIndex + '/Original/' + element + '.pdf', (err) => {
        //         if (err) console.log(err);
        //     });
        // };
        // ***************************************************************************

        // let filesOfNew = [];
        // const out = fs.createWriteStream("C:/Users/Dudu-PT/Desktop/duplex/NewThatIsNoMore/list.txt"); 
        // fs.readdir('C:/Users/Dudu-PT/Desktop/duplex', (err, files) => {
        //     files.forEach(element => {
        //         if (!oldArr.includes(element.replace(".templates.impopack", ""))) {
        //             console.log(element.replace(".templates.impopack", ""));
        //             out.write(element.replace(".templates.impopack", "") + "\n");
        //             filesOfNew.push(element.replace(".templates.impopack", ""));
        //             fs.copyFile('C:/Users/Dudu-PT/Desktop/duplex/' + element, 'C:/Users/Dudu-PT/Desktop/duplex/NewThatIsNoMore/' + element, (err) => {
        //                 if (err)  console.log(err);
        //               });
        //         };
        //     });
        //     out.end();
        //     // console.log(filesOfNew);
        //     console.log(filesOfNew.length);
        // });
        // ***************************************************************************

        // const newOldArr = [];
        // const testArr = [];
        // oldArr.forEach(element => {
        //     let a = element.split('-');
        //     // let b = a[3];
        //     // let temporary = b[0];
        //     // b[0] = b[1];
        //     // b[1] = temporary;
        //     // a[0] = '\t002';
        //     // element = a.join('-');
        //     newOldArr.push(a[3])
        //     testArr.push(a[3].split('x').join(''))
        //     // if (nidePrepareArr.includes(element)) {
        //     //     console.log(nidePrepareArr.includes(element));
        //     //     console.log(element);
        //     // };
        // });

        // ***************************************************************************
        // for (let index = 0; index < newOldArr.length; index++) {
        //     const element = newOldArr[index];
        //     let b = element.split('x');
        //     let temporary = b[0];
        //     b[0] = b[1];
        //     b[1] = temporary;
        //     b = b.join('');
        //     if (!testArr.includes(b)) {
        //         console.log('element: ==>> ' + element);
        //         console.log('testArr: ==>> ' + testArr[index]);
        //         console.log('b: ==>> ' + b);
        //     };

        // }
        // ***************************************************************************

        const oldArrSizes = [];
        const newArrSizes = [];
        const newArr = [];
        const testArr = [];

        oldSizesArr.forEach(oldelement => {
            let oldSize = oldelement.split('-')[3].split('x').join('');
            oldArrSizes.push(oldSize);
        });
        allTemplates.forEach(newElement => {
            let newSize = newElement.split('x').join('');

            if (!newArrSizes.includes(newSize) || !oldArrSizes.includes(newSize)) {
                newArrSizes.push(newSize);
                newArr.push('002-rc-s&r-' + newElement + '-simplex')
            };

            let a = newElement.split('x');
            let temporary = a[0];
            a[0] = a[1];
            a[1] = temporary;
            let newSizeB = a.join('');
            if (!newArrSizes.includes(newSizeB)) {
                newArrSizes.push(newSizeB);
                newArr.push('002-rc-s&r-' + a.join('x') + '-simplex')
            };
            // element = a.join('-');
            // newOldArr.push(a[3])
            // testArr.push(a[3].split('x').join(''))
            // if (nidePrepareArr.includes(element)) {
            //     console.log(nidePrepareArr.includes(element));
            //     console.log(element);
            // };
        });

        newArr.forEach(element => {
            console.log(element);
        });
        console.log('newArrSizes.length: ==>> ' + newArrSizes.length);
        console.log('****************************************');

    }
};

module.exports = new checkTemplatesReady();
