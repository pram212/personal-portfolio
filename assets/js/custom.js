
function typedInit(strings, element) {
    new Typed(element, {
        strings: strings,
        typeSpeed: 40,
        loop: true,
        loopCount: Infinity,
    });
}

// get biodata
axios.get('https://cms.monoport.web.id/api/biodata')
    .then(function (response) {
        const biodata = response.data

        $("#bio-foto").attr("src", `https://cms.monoport.web.id/${biodata.foto}`);
        $("#bio-nama").append(`<span>${biodata.nama}</span>`);
        $("#bio-profil").append(`<span>${biodata.profil}</span>`);
        $("#bio-lulusan").append(`<span>${biodata.lulusan}</span>`);
        $("#bio-about").text(biodata.tentang);
        $(".hero-title").text(biodata.nama);
        typedInit([biodata.profil],'.hero-subtitle')

    })
    .catch(function (error) {
        console.log(error)
    })

// get kontak
axios.get('https://cms.monoport.web.id/api/kontak')
    .then(function (response) {
        const kontak = response.data
        $("#alamat").append(`${kontak.alamat}`)
        $("#telepon").append(`${kontak.telepon}`)
        $("#email").append(`${kontak.email}`)
        $("#linkedin").attr("href", kontak.linkedin)
        $("#gitlab").attr("href", kontak.gitlab)
    })
    .catch(function (error) {
        console.error(error);
    });

// get skill
axios.get('https://cms.monoport.web.id/api/skill')
    .then(function (response) {
        const skills = response.data
        $.each(skills, function (indexInArray, skill) {
            $("#skill-list").append(`
                <span>${skill.skill}</span>
                <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${skill.level}%;" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `);
        });
    })
    .catch(function (error) {
        console.error(error);
    });

// get portfolio
axios.get('https://cms.monoport.web.id/api/portfolio')
    .then(function (response) {
        const portfolios = response.data

        $.each(portfolios, function (indexInArray, portfolio) {

            $("#portfolio-list").append(`
                <div class="col-md-4">
                    <div class="work-box">
                        <a href="#" data-gallery="portfolioGallery" class="portfolio-lightbox">
                            <div class="work-img">
                                <img src="https://cms.monoport.web.id/${portfolio.image_url[0]}" alt="" class="img-fluid">
                            </div>
                        </a>
                        <div class="work-content">
                            <div class="row">
                                <div class="col-sm-8">
                                    <h2 class="w-title">${portfolio.nama}</h2>
                                    <div class="w-more">
                                        <span class="w-ctegory">${portfolio.kategori}</span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="w-like">
                                        <a href="portfolio-detail.html?id=${portfolio._id}"> <span class="bi bi-plus-circle"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

        });

    })
    .catch(function (error) {
        console.log(error)
    })
