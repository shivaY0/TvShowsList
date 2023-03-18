const totalTimeShow = document.getElementById("totalTime")
var counTotalTime = 0, countTotalSepTime = 0;

function covertMin(time) {
    // console.log(time);
    let days = parseInt(time / (60 * 24));
    time %= (60 * 24)
    let hrs = parseInt(time / 60);
    time %= 60;
    let min = time;
    totalTimeShow.innerHTML = "";
    totalTimeShow.innerText = days + " days, " + hrs + " hours, " + min + " min ";
}

TV_SHOWS.forEach(TvShow => {

    //-> Section for all webseries 
    const main_container = document.querySelector('section')
    const container = document.createElement('div');
    container.className = 'show-list-box';
    const show_img_header = document.createElement('div');
    show_img_header.className = 'show-img-header'
    const show_img = document.createElement('img');
    show_img.className = 'show-img';

    show_img.src = TvShow.image;

    show_img.alt = "shows-header-img";
    show_img_header.appendChild(show_img);

    //-> selection of season (select tag)
    const select_opt = document.createElement('select');
    select_opt.className = 'select-opt';
    // select_opt.onChange = seasonFunction();
    const defaultOption = document.createElement('option');

    defaultOption.innerText = "Season"

    select_opt.appendChild(defaultOption)
    select_opt.selectedIndex = 0;
    defaultOption.disabled = true;

    //-> option for season in a webseries
    TvShow.seasons.forEach((season, index) => {
        const option = document.createElement('option');
        option.value = (parseInt(index) + 1);
        option.innerHTML = "Season " + (parseInt(index) + 1);
        select_opt.appendChild(option)
        // console.log(option.value)
        // show_img_header.appendChild(select_div)
    })

    // console.log(select_opt.value);


    show_img_header.appendChild(select_opt);
    container.appendChild(show_img_header)
    main_container.appendChild(container);
    // console.log(container)

    //right side  
    // for title and summary of webseries 
    const show_content = document.createElement('div');
    show_content.className = 'show-content';
    const show_name_content = document.createElement('div')
    show_name_content.className = 'show-name-content';

    const show_name = document.createElement('h5');
    show_name.className = 'show-name';
    show_name.innerHTML = TvShow.name;
    const realeased_time = document.createElement('a')
    realeased_time.className = 'show-released-time';
    realeased_time.href = TvShow.officialSite;

    realeased_time.innerText = "Premiered at " + TvShow.channel + " on " + TvShow.premiered.replace(/-/g, '/') + "(" + TvShow.status + ")";

    show_name_content.appendChild(show_name);
    show_name_content.appendChild(realeased_time);
    show_content.appendChild(show_name_content)

    container.appendChild(show_content);

    const show_summary_content = document.createElement('div')
    show_summary_content.classname = 'show-summary-content'
    const show_summary = document.createElement('p');
    show_summary.className = 'show-summary';

    show_summary.innerHTML = TvShow.summary;

    show_summary_content.appendChild(show_summary);
    show_content.appendChild(show_summary_content)

    const show_genres = document.createElement('div');
    show_genres.classList = 'show-genres-content genres-list';
    //    console.log(show_genres)
    const genre_title = document.createElement('h3');
    genre_title.className = 'genre-title';
    genre_title.innerText = "Genres: "
    show_genres.appendChild(genre_title);

    //-> genres 
    TvShow.genres.forEach(genres => {
        const genre = document.createElement('li');
        genre.className = 'genre';
        genre.innerText = genres;
        show_genres.appendChild(genre)
    })

    show_content.appendChild(show_genres)

     
    // seasons section 
    const seasons = document.createElement('div')
    seasons.className = 'seasons'

    
    var countSeasonTime = 0;

    // on choosing season 
    select_opt.addEventListener("change", function () {

        document.querySelector('.show-time-spent').style.display = 'flex';
        counTotalTime -= countSeasonTime;
        covertMin(counTotalTime)
        countSeasonTime = 0;

        // console.log(counTotalTime,countSeasonTime)

        let ind = select_opt.value - 1;
        seasons.innerHTML = "";
        const selected_sesaon = document.createElement('h3');
        selected_sesaon.className = 'selecetd-season-title'
        const season_checkbox = document.createElement('div')
        season_checkbox.className = 'season-checkbox'
        const all_seasons_checkbox = document.createElement('input')
        all_seasons_checkbox.type = 'checkbox'
        all_seasons_checkbox.name = 'all-seasons'
        checkbox_label = document.createElement('label')
        checkbox_label.className = 'checkbox-title';
        checkbox_label.innerText = "Marcar todos";
        selected_sesaon.innerText = "Season " + select_opt.value
        seasons.appendChild(selected_sesaon);
        seasons.appendChild(season_checkbox)
        season_checkbox.appendChild(all_seasons_checkbox)
        season_checkbox.appendChild(checkbox_label);

        var countTime = 0,countchecked=0;

        // on changing todos checkbox
        all_seasons_checkbox.addEventListener("change", () => {


            if (all_seasons_checkbox.checked) {
                totalCountChecked = countchecked;
                counTotalTime += countTime;
                countSeasonTime += countTime
            }
            else {
                totalCountChecked=0;
                counTotalTime -= countTime;
                countSeasonTime -= countTime;

            }
        })

        var totalCountChecked =0;
        TvShow.seasons[ind].forEach((season, index) => {
            // console.log(season,index);
            const season_list = document.createElement('div');
            season_list.className = 'seasons-list'
            const season_img = document.createElement('div')
            season_img.className = 'season-img'
            const season_show_img = document.createElement('img')
            season_show_img.alt = 'season-show-img'
            season_show_img.src = season.image

            season_list.appendChild(season_img);
            season_img.appendChild(season_show_img);

            const season_content = document.createElement('div')
            season_content.className = 'season-content'
            const season_title_content = document.createElement('div')
            season_title_content.className = 'season-title-content'
            const chekbox_input = document.createElement('input');
            chekbox_input.type = 'checkbox';
            const epsd_title = document.createElement('h3')
            // chekbox_input.checked = check;
            epsd_title.className = 'title'


            countTime += parseInt(season.runtime)
            countchecked++;

            // console.log(all_seasons_checkbox.value)
            var countSepTime = 0;
            // let days = 0,hrs =0,min = 0;
            all_seasons_checkbox.addEventListener("change", () => {
                
                if (countTotalSepTime > countSepTime) {
                    countTotalSepTime -= countSepTime;
                    countSeasonTime -= countSepTime;
                }
                else countTotalSepTime = 0;
                countSepTime = 0;
                // if(all_seasons_checkbox)totalCountChecked = countchecked;
                // else totalCountChecked =0;
                chekbox_input.checked = all_seasons_checkbox.checked;
                covertMin(counTotalTime + countTotalSepTime)

                // if(!all_seasons_checkbox)countSepTime=0;
            })

            // on change of indivitual checkbox 
            chekbox_input.addEventListener('change', () => {

                if (chekbox_input.checked) {
                    if(totalCountChecked<countchecked)totalCountChecked++;
                    countSepTime += parseInt(season.runtime);
                    countTotalSepTime += parseInt(season.runtime);
                    covertMin(counTotalTime + countTotalSepTime);
                    // totalCountChecked++;
                }
                else {
                    totalCountChecked--;
                    countSepTime -= parseInt(season.runtime);
                    countTotalSepTime -= parseInt(season.runtime);

                    covertMin(counTotalTime + countTotalSepTime)
                }
                // console.log(totalCountChecked,countchecked)
                if(totalCountChecked===countchecked)all_seasons_checkbox.checked=true;
                else all_seasons_checkbox.checked = false;
                countSeasonTime += countSepTime;
            })
            epsd_title.innerText = "S" + (ind<10?"0":'') + (ind+1)  + "E" + (season.number<10?'0':'') + season.number + ": " + season.name

            season_title_content.appendChild(chekbox_input)
            season_title_content.appendChild(epsd_title)
            season_content.appendChild(season_title_content)

            const season_date = document.createElement('time');
            season_date.className = 'season-date';
            season_date.innerText = season.airdate.replace(/-/g, '/');
            const season_summary = document.createElement('p')
            season_summary.classList = 'season-summary  season-summary-content'
            season_summary.innerText = season.summary;


            season_content.appendChild(season_date);
            season_content.appendChild(season_summary)

            season_list.appendChild(season_content)

            seasons.appendChild(season_list);

        })
    })
    show_content.appendChild(seasons)
})



