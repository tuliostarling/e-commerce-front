import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { CommentModel, RequestCommentModel } from '../../model/comment/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    API_URL: string = AppSettings.API_ENDPOINT + 'comment/';

    constructor(
        private http: HttpClient
    ) { }

    getList(id: number) {
        return this.http.get<RequestCommentModel>(`${this.API_URL}getComment/${id}`);
    }

    create(dadosForm: CommentModel) {
        return this.http.post<CommentModel>(`${this.API_URL}addComment/`, dadosForm);
    }

    update(dadosForm: CommentModel) {
        return this.http.put<CommentModel>(`${this.API_URL}put/`, dadosForm);
    }

    delete(id: number) {
        return this.http.delete<CommentModel>(`${this.API_URL}del/${id}`);
    }

}
