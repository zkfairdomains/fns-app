
function copyToClipboard() {
  // Tıklanan butonun olduğu satırı bul
  var buttonRow = event.target.parentNode;

  // Metni içeren elementi bul
  var copyTextElement = buttonRow.querySelectorAll('.copy-text');

  // Metni seç
  var copyText = copyTextElement.textContent;

  // Bir textarea oluştur ve metni textarea'ya kopyala
  var tempTextarea = document.createElement("textarea");
  tempTextarea.value = copyText;

  // Sayfaya textarea'yi ekle
  document.body.appendChild(tempTextarea);

  // textarea'yı seç ve kopyala
  tempTextarea.select();
  document.execCommand("copy");

  // Artık textarea'ya ihtiyaç yok, kaldır
  document.body.removeChild(tempTextarea);

  // Kopyalandı mesajını ekle (isteğe bağlı)
  alert("Metin kopyalandı: " + copyText);
}

//Geri sayım Start
document.addEventListener('DOMContentLoaded', function () {
  //copyToClipboard();
  var countdownElement = document.getElementById('countdown');
  var countdownBar = document.getElementById('cbar');
  var buttonsContent = document.getElementById('buttons');
  var seconds = 60;

  function updateCountdown() {
    countdownElement.textContent = seconds;

    seconds--;
    countdownBar.style.maxWidth =seconds+'%';

    if (seconds < 0) {
      // Geri sayım tamamlandığında istediğiniz işlemleri burada gerçekleştirebilirsiniz
      buttonsContent.classList.remove('d-none');
      alert('Geri sayım tamamlandı!');
    } else {
      setTimeout(updateCountdown, 1000);
    }
  }

  // Geri sayımı başlat
  updateCountdown();
});


//Tab start

document.addEventListener('DOMContentLoaded', function () {
    // Tüm tab-nav bağlantılarını seç
    var tabLinks = document.querySelectorAll('.tab-nav a');

    // Her bir tab-nav bağlantısına tıklama olayı ekleyin
    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        // Tıklanan bağlantının href değerini al
        var tabId = link.getAttribute('href').substring(1);

        // Tüm panelleri gizle
        var panes = document.querySelectorAll('.pane');
        panes.forEach(function (pane) {
          pane.style.display = 'none';
        });

        // İlgili paneli göster
        var activePane = document.getElementById(tabId);
        activePane.style.display = 'block';

        // Tüm tab-nav bağlantılarından active sınıfını kaldır
        tabLinks.forEach(function (otherLink) {
          otherLink.classList.remove('active');
        });

        // Tıklanan tab'a active sınıfını ekle
        link.classList.add('active');
      });
    });

    // İlk tab'ı başlangıçta açık hale getir ve active sınıfını ekle
    var firstTab = document.querySelector('.tab-nav li:first-child a');
    firstTab.click();
    firstTab.classList.add('active');
  });
  // Tab end
 
// Accordion Start
document.addEventListener('DOMContentLoaded', function () {
    // Tüm accItem öğelerini seç
    var accItems = document.querySelectorAll('.accItem');

    // Her bir accItem öğesine tıklama olayı ekleyin
    accItems.forEach(function (item) {
      var head = item.querySelector('.accHead');

      // head etiketine tıklama olayını doğrudan ekleyin
      head.addEventListener('click', function () {
        // Tıklanan accItem'in accBody öğesini göster/gizle
        var body = item.querySelector('.accBody');
		head.classList.toggle('active');
        body.classList.toggle('d-none');
      });
    });
  });
  // Accordion End


document.addEventListener('DOMContentLoaded', function () {


	var dropdowns = document.querySelectorAll('.dropdown');
  
	dropdowns.forEach(function (dropdown) {
	  var toggle = dropdown.querySelector('.dropdown-toggle');
	  var menu = dropdown.querySelector('.dropdown-menu');
  
	  toggle.addEventListener('click', function () {
		toggleDropdown(menu);
	  });
  
	});
  
	function toggleDropdown(menu) {
	  menu.classList.toggle('show');
	}
  
	function showDropdown(menu) {
	  menu.classList.add('show');
	}
  
	function hideDropdown(menu) {
	  menu.classList.remove('show');
	}


	var menuIcon = document.querySelector('.mm');
  	var controlsContent = document.querySelector('.controls-content');
	menuIcon.addEventListener('click', function () {
		menuIcon.classList.toggle('active');
		controlsContent.classList.toggle('active');
	});


	window.addEventListener('resize', function() {
		// Ekran boyutu değiştiğinde yapılacak işlemler buraya yazılır
		checkResolution();
	  });
	  
	  function checkResolution() {
		// Ekran çözünürlüğünü kontrol etmek için gerekli işlemler buraya yazılır
		var screenWidth = window.innerWidth;
	  
		// Örnek: Ekran genişliği 600 pikselden küçükse
		if (screenWidth < 600) {
		  // Burada yapılacak işlemler
		  console.log('Ekran küçük');
		} else {
		  // Burada yapılacak işlemler
		  console.log('Ekran büyük veya eşit');
		}
	  }
	  
	  // Sayfa yüklendiğinde kontrolü bir kere çalıştırabilirsiniz
	  checkResolution();

  });
  


  