/* eslint-disable no-plusplus */

const siteName = document.getElementById('siteName');
const siteURL = document.getElementById('siteURL');
const submitBtn = document.getElementById('submitButton');

let bookmarkersList = [];

function clearForm() {
  siteName.value = '';
  siteURL.value = '';
}

function displayBookmarkers(bookmarkersList) {
  let bookmarkers = '';
  for (let i = 0; i < bookmarkersList.length; i++) {
    bookmarkers += `
        <tr>
        <td class=" py-5 border text-center">${i + 1}</td>
        <td class=" py-5 border text-center p-4">${bookmarkersList[i].siteName}</td>
        <td class=" py-5 border text-center p-4"><button id="visitButton" class="btn" onclick="visitWebsite(${i});">Visit</button></td>
        <td class=" py-5 border text-center p-4"><button id="deleteButton" class="btn" onclick="deleteBookmarker(${i});">Delete</button></td>
        </tr>`;
  }

  document.getElementById('bookmarkTable').innerHTML = bookmarkers;
}

function isValidUrl(url) {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?'
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
      + '((\\d{1,3}\\.){3}\\d{1,3}))'
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
      + '(\\?[;&a-z\\d%_.~+=-]*)?'
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return pattern.test(url);
}

function isBookmarkUnique(name) {
  return !bookmarkersList.some((bookmark) => bookmark.siteName === name);
}

function addBookmark() {
  const bookmark = {
    siteName: siteName.value,
    siteURL: siteURL.value,
  };
  if (isBookmarkUnique(bookmark.siteName)) {
    if (isValidUrl(bookmark.siteURL)) {
      bookmarkersList.push(bookmark);
      localStorage.setItem('Bookmarkers', JSON.stringify(bookmarkersList));
      displayBookmarkers(bookmarkersList);
      clearForm();
    } else {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Please enter valid URL',
        confirmButtonColor: '#0d6efd',
      });
    }
  } else {
    // eslint-disable-next-line no-undef
    Swal.fire('Bookmarker already exists');
  }
}

if (localStorage.getItem('Bookmarkers') != null) {
  bookmarkersList = JSON.parse(localStorage.getItem('Bookmarkers'));
  displayBookmarkers(bookmarkersList);
}

function deleteBookmarker(i) {
  bookmarkersList.splice(i, 1);
  localStorage.setItem('Bookmarkers', JSON.stringify(bookmarkersList));
  displayBookmarkers(bookmarkersList);
}

function visitWebsite(i) {
  window.open(bookmarkersList[i].siteURL);
}

submitBtn.addEventListener('click', addBookmark);
