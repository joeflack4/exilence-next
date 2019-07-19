import { Injectable } from '@angular/core';
import { GithubRelease } from '../../shared/interfaces/github/github-release.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GithubService {

    // create variables for each lazyloaded module here
    public netWorthLoaded = false;

    constructor(private http: HttpClient) {
    }

    /* #region github.com */
    getLatestRelease(): Observable<GithubRelease> {
        return this.http.get<GithubRelease>('https://api.github.com/repos/viktorgullmark/exilence-next/releases/latest');
    }
    /* #endregion */
}


