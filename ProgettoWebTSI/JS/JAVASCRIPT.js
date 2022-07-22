const Home = {     
    template:  `
    <div class="col-12 col-md-8">
        <article class="bg-dark text-white border border-dark rounded mt-4 mb-4">
            <h2 class="px-5 text-danger">D3.js Data-Driven Documents</h2>
            <p class="px-5">Sito web ufficiale: https://d3js.org/</p>
            <p class="px-5">
            <span class="text-danger">D3</span>.js (Data-Driven Documents) è una libreria JavaScript per creare visualizzazioni
            dinamiche ed interattive partendo da dei dati in formato: XML, CSV, o JSON, visibili tramite un browser e 
            utilizzando le tecnologie standard del web: HTML, SVG, CSS.
            </p>
            <ul class="px-5">
                <li>
                    HTML: HyperText Markup Language, usato per creare la struttura logica di una pagina
                        web e di come viene rappresentata.
                </li>
                <li>    
                    CSS: Cascading Style Sheets, linguaggio usato per definire gli stili grafici degli
                        degli elementi di una pagina web.
                </li>
                <li>    
                    SVG: Scalable Vector Graphics, particolare formato in grado di visualizzare oggetti
                        di grafica vettoriale, ovvero salvare immagini in modo che siano ingrandibili
                        e rimpicciolibili a piacere senza perdere in risoluzione grafica.
                </li>    
                <li>
                    Javascript: linguaggio di scripting lato client utilizzato per rendere interattive le pagine web.
                </li>    
            </ul>

            <h3 class="px-5">Selections</h3>
            <p class="px-5">La libreria D3 utilizza funzioni JavaScript prefatte per selezionare elementi del DOM, creare
            elementi SVG, aggiungergli uno stile grafico, transizioni, tooltip.<br>
            Il concetto centrale del design di D3 è permettere al programmatore di usare dei selettori, 
            come per i CSS, per scegliere i nodi all'interno del DOM e manipolarli.<br>
            L'esempio seguente seleziona tutti gli elementi p e ne definisce lo stile.<br><br>
            <span class="text-danger">d3</span>.selectAll("p")<br>
                .style("color", "violet")<br>
            </p>

            <h3 class="px-5">Proprietà dinamiche</h3>
            <p class="px-5">Stili, attributi, e proprietà possono essere specificate come funzioni di dati e non 
            solo come costanti.<br>Alcuni esempi:<br>Seleziona tutti i p e li colora in maniera casuale<br><br>
            <span class="text-danger">d3</span>.selectAll("p").style("color", function() {<br>
              return "hsl(" + Math.random() * 360 + ",100%,50%)";<br>
            });<br><br>
            Seleziona tutti i p e ne definisce la dimensione del font, ogni singolo paragrafo è
            riferito al proprio dato by default secondo il formato "join-by-index", quindi p1 == 4,
            p2 == 8, p3 == 15...<br><br>
            <span class="text-danger">d3</span>.selectAll("p")<br>.data([4, 8, 15, 16, 23, 42])<br>.style("font-size", function(d) { return d + "px"; });</p>
        </article>
        <!--Page Navigation-->
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item "><router-link class="page-link text-danger bg-dark border-dark" to="/">1</router-link></li>
                <li class="page-item"><router-link class="page-link text-danger bg-dark border-dark" to="/pagina2">2</router-link></li>
            </ul>
        </nav>
    </div>
    `
};

const pagina2 = {
    data() {
        return {
            data: [
                {  name: "Simon", score: 80 },
                { name: "Mary", score: 90 },
                { name: "John", score: 60 },
                { name: "Peter", score: 70}
            ],
            width: 800,
            height: 400,
            margin: { top: 50, bottom: 50, left: 50, right: 50}
        }
    },
    template: `
    <div class="col-12 col-md-8">
       <article class="bg-dark text-white border border-dark rounded mt-4 mb-4">
            <h2 class="px-5 text-danger">D3.js Data-Driven Documents</h2>
            <h3 class="px-5">Selezioni Enter e Exit</h3>
            <p class="px-5">Quando i dati sono legati a una selezione, ogni elemento dell'array dei dati è viene
            corrisposto a un nodo della selezione come abbiamo visto "joined-by-index", 
            se i nodi sono meno del numero di dati, quelli lasciati fuori dalla selezione 
            vanno a formare la selezione "enter". Nella quale si possono aggiungere altri 
            nodi del DOM tramite la proprietà ".append"<br>
            Esempio:<br><br>
            <span class="text-danger">d3</span>.select("body")<br>
               .selectAll("p")<br>
               .data([4, 8, 15, 16, 23, 42])<br>
               .enter().append("p")<br>
               .text(function(d) { return "I’m number " + d + "!"; });<br>
               Per la .exit è l'inverso.<br><br></p>
            <h3 class="px-5">Transizioni</h3>
            <p class="px-5"> 
            Eseguono stili e attributi over time.<br>Colora il background over-time e non instantaneamente:<br><br>
            <span class="text-danger">d3</span>.select("body").transition()<br>
              .style("background-color", "black");
            </p>
            <h3 class="px-5">Esempio creato da noi</h3>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div id="d3-container"></div>
                    </div>
                </div>
            </div>
        </article>
       <!--Page Navigation-->
       <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item "><router-link class="page-link text-danger bg-dark border-dark" to="/">1</router-link></li>
                <li class="page-item"><router-link class="page-link text-danger bg-dark border-dark" to="/pagina2">2</router-link></li>
            </ul>
        </nav>
    </div>
    `,
    methods: {
        loadGraph (){
            const svg = d3.select("#d3-container")
                        .append("svg")
                        .attr("viewBox", [0, 0, this.width, this.height]);

            //Implementa il grafico affinchè sia scalabile automaticamente
            const x = d3.scaleBand()
                        .domain(d3.range(this.data.length))
                        .range([this.margin.left, this.width - this.margin.right])
                        .padding(0.1);

            const y = d3.scaleLinear()
                        .domain([0, 100])
                        .range([this.height - this.margin.bottom, this.margin.top]);
                
            //Crea le bar, le colora, e le sorta in maniera discendente
                svg 
                .append("g")
                .attr("fill", "darkred") 
                .selectAll("rect")
                .data(this.data.sort((a, b) => d3.descending(a.score, b.score)))
                    .join("rect")
                    .attr("x", (d, i) => x(i))
                    .attr("y", (d) => y(d.score))
                    .attr("height", d => y(0) - y(d.score))
                    .attr("width", x.bandwidth())
                    .attr("class", "rectangle")

            //Chiama le funzioni sopra definite
            svg.append("g").call(this.yAxis);
            svg.append("g").call(this.xAxis);

            //Ritorna il grafo
            svg.node();
        },
        //Crea la scala delle ascisse
        xAxis(g){
            const x = d3.scaleBand()
                        .domain(d3.range(this.data.length))
                        .range([this.margin.left, this.width - this.margin.right])
                        .padding(0.1);
            g.attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => this.data[i].name))
            .attr("font-size", "20px")
        },
        //Crea la scala delle ordinate
        yAxis(g) {
            const y = d3.scaleLinear()
                        .domain([0, 100])
                        .range([this.height - this.margin.bottom, this.margin.top]);
            g.attr("transform", `translate(${this.margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(null, this.data.format))
            .attr("font-size", "20px")
            },
    },
   mounted(){
    this.loadGraph();
  }
};

const visualizzaDati = {     
    data() {
        return {    
            movies: null 
        }
    }, 

    methods: {
        getData: function(){
            axios.get("./JSON/JSON.json")
                .then(response => {
                    this.movies = response.data;
                });
        }
    },
    mounted(){
        this.getData();
    },
    template:  `
    <div class="col-12 col-md-8">
        <article class="bg-dark text-white border border-dark rounded mt-4 mb-4" v-for="movie in movies">
            <h2 class="px-5 text-danger">{{movie["Title"]}}</h2>
            <p class="px-5">Regista: {{movie["Director"]}}</p>
            <p class="px-5">Anno d'uscita: {{movie["Year"]}}</p>
        </article>
    </div>
    `
};



const manipolaDati = {     
    data() {
        return {
            movies: null,
            selected: 0,
            titolo: "",
            regista: "",
            anno: ""
        }
    },
    methods: {
        getData: function(){
            axios.get("./JSON/JSON.json")
                .then(response => {
                    this.movies = response.data;
                });
        },
        addMovie (){
            this.movies.push({
                "Title": this.titolo,
                "Director": this.regista,
                "Year": this.anno
              })
          },
        deleteMovie (){
            this.movies.splice(this.selected,1)
        }
            },
    beforeMount(){
        this.getData();
    },
    template:  `
    <div class="col-12 col-md-8">
        <article class="bg-dark text-white border border-dark rounded mt-4 mb-4">
            <div class="row">
                <form class="col-12 col-xl-4">
                    <h2 class="text-danger">Aggiungi Film</h2>
                    <ul class="text-danger">
                        <li>
                            <div>Titolo:</div>
                            <input v-model="titolo" class="rounded" type="text" id="titolo"/>    
                        </li>
                        <li>
                            <div>Regista:</div>
                            <input v-model="regista" class="rounded" type="text" id="regista"/>
                        </li>
                        <li>
                            <div>Anno:</div>
                            <input v-model="anno" class="rounded" type="text" id="anno"/>    
                        </li>
                        <li>
                        <button v-on:click="addMovie" class="btn btn-outline-danger mt-1" type="button" id="submit">Aggiungi</button>
                        </li> 
                    </ul>
                </form>
                <form class="col-12 col-xl-4">
                    <h2 class="text-danger">Modifica Film</h2>
                    <div class="text-danger">Film da modificare:</div>
                    <select id="film_selezionato" class="rounded" v-model="selected">
                        <option v-for="(movie, index) in movies" v-bind:value="index">{{movie.Title}}</option>
                    </select> 
                        <ul class="text-danger">
                            <li>
                                <div>Titolo:</div>
                                <input v-model="movies[selected].Title" class="rounded" type="text"/>    
                            </li>
                            <li>
                                <div>Regista:</div>
                                <input v-model="movies[selected].Director" class="rounded" type="text"/>
                            </li>
                            <li>
                                <div>Anno:</div>
                                <input v-model="movies[selected].Year" class="rounded" type="text"/>    
                            </li>
                        </ul>
                </form>
                <form class="col-12 col-xl-4">
                    <h2 class="text-danger">Elimina Film</h2>
                        <div class="text-danger">Film da eliminare:</div>
                        <select class="rounded" v-model="selected">
                            <option v-for="(movie, index) in movies" v-bind:value="index">{{movie.Title}}</option>
                        </select>
                        <div></div>
                        <button v-on:click="deleteMovie" class="btn btn-outline-danger mt-1" type="button" name="submit" id="submit2">Elimina</button>
                </form>
                </div>
        </article>
    </div>
    `
}


const routes = [
  { path: '/', component: Home },
  { path: '/visualizzaDati', component: visualizzaDati },
  { path: '/manipolaDati', component: manipolaDati },
  { path: '/pagina2', component: pagina2}
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');
