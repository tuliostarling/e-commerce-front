export interface CommentModel {
    id: number;
    id_user: number;
    id_subproduct: number;
    comment: string;
    rating: number;
    created_at: Date;
}

export interface RequestCommentModel {
    avgRating: number;
    total: number;
    rows: Array<CommentModel>;
}
