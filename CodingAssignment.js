/* Menu App that allows you to add and delete Artists, and their albums. */

class Albums {
    constructor(name, year) {
        this.name = name;
        this.yearMade = year;

    }

    describe() {
         return `${this.name} was released in ${this.yearMade}.`
     }
}

class Bands {
    constructor(name, year, origin) {
        this.name = name;
        this.year = year;
        this.origin = origin;
        this.albums = [];
            
        }
        addAlbum(album) {
            if (album instanceof Albums) {
                this.albumList.push(Albums);
            } else {
                throw new Error(`You can only add an instance of Albums. Argument is not an album: ${album}`)
            }
    
        }
        describe() {
            return `${this.name} was formed in ${this.year} in ${this.origin}.`;
        }
}

class Menu{
    constructor() {
        this.bands = [];
        this.bands.year = [];
        this.bands.origin = [];
        this.selectedBand = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Add band
        2) View band
        3) Delete band
        4) Display all bands
        `);
    }

    showAlbumMenuOptions(bandInfo) {
        return prompt(`
        0) Back
        1) Add Album
        2) Remove Album
        <----------------->
        ${bandInfo}
        `);
    }

    displayBands() {
        let bandString = '';
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name + '\n';
        }
        alert(bandString);
    }

    addBand() {
        let name = prompt("What is the band's name?");
        let year = prompt('What year was the band formed?');
        let origin = prompt('Where did the band form?');
        this.bands.push(new Bands(name, year, origin));
    }

    viewBand() {
        let index = prompt('Enter number of the band to view:');
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = `
            Band Name : ${this.selectedBand.name}
            Year Formed: ${this.selectedBand.year}
            Origin: ${this.selectedBand.origin}
            Albums: 
            `;
            
            for (let i = 0; i < this.selectedBand.albums.length; i++) {
                description += i + ') ' + this.selectedBand.albums[i].name 
                    + ' - ' + this.selectedBand.albums[i].yearMade + '\n';
            }
            let selection = this.showAlbumMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addAlbum();
                    break;
                case '2':
                    this.removeAlbum();
            }
        
        }
    }

    deleteBand() {
        let index = prompt('Enter number of Band to delete:');
        if (index > -1 &&  index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }

    addAlbum() {
        let name = prompt('What is the name of the album?');
        let year = prompt('What year was this album released?');
        this.selectedBand.albums.push(new Albums(name, year));
    }

    removeAlbum() {
        let index = prompt('Enter number of album you wish to remove:');
        if (index > -1 && index < this.selectedBand.albums.length) {
            this.selectedBand.albums.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();