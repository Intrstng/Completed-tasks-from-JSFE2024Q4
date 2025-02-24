import './news.css';
import { ArticleItem } from '../../controller/loader';

class News {
    draw(data: ArticleItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) {
                    const newsItemElement = newsClone.querySelector<HTMLElement>('.news__item');
                    if (newsItemElement) {
                        newsItemElement.classList.add('alt');
                    }
                }

                const photoElement = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (photoElement) {
                    photoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const authorElement = newsClone.querySelector<HTMLElement>('.news__meta-author');
                if (authorElement) {
                    authorElement.textContent = item.author || item.source.name || 'Unknown Author';
                }

                const dateElement = newsClone.querySelector<HTMLElement>('.news__meta-date');
                if (dateElement) {
                    dateElement.textContent = (item.publishedAt || 'No Date Available')
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
                }

                const descriptionTitleElement = newsClone.querySelector<HTMLElement>('.news__description-title');
                if (descriptionTitleElement) {
                    descriptionTitleElement.textContent = item.title || 'Unknown title';
                }

                const descriptionSourceElement = newsClone.querySelector<HTMLElement>('.news__description-source');
                if (descriptionSourceElement) {
                    descriptionSourceElement.textContent = item.source.name || 'Unknown name';
                }

                const descriptionContentElement = newsClone.querySelector<HTMLElement>('.news__description-content');
                if (descriptionContentElement) {
                    descriptionContentElement.textContent = item.description  || 'Unknown description';
                }

                const readMoreElement = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
                if (readMoreElement) {
                    readMoreElement.setAttribute('href', item.url || '#');
                }

                fragment.append(newsClone);
            });

            const newsContainer = document.querySelector<HTMLElement>('.news');
            if (newsContainer) {
                newsContainer.innerHTML = '';
                newsContainer.appendChild(fragment);
            } else {
                console.error("Element with class 'news' not found");
            }
        }
    }
}

export default News;
