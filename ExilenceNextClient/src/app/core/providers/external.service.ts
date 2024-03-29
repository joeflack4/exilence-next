import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin, combineLatest } from 'rxjs';
import RateLimiter from 'rxjs-ratelimiter';

import { RatelimitHelper } from '../../shared/helpers/ratelimit.helper';
import { Character } from '../../shared/interfaces/character.interface';
import { League } from '../../shared/interfaces/league.interface';
import { Stash, Tab } from '../../shared/interfaces/stash.interface';
import { ApplicationSession } from '../../shared/interfaces/application-session.interface';
import { Store } from '@ngrx/store';
import { selectApplicationSession } from '../../store/application/application.selectors';
import { PricedItem } from '../../shared/interfaces/priced-item.interface';
import { map, delay } from 'rxjs/operators';
import { Item } from '../../shared/interfaces/item.interface';
import { AppConfig } from './../../../environments/environment';
import { NetWorthState } from '../../app.states';
import * as netWorthActions from './../../store/net-worth/net-worth.actions';
import { ItemHelper } from '../../shared/helpers/item.helper';

@Injectable()
export class ExternalService {

  private rateLimiter = new RateLimiter(5, 10000);
  private poeUrl = 'https://www.pathofexile.com';

  private session$: Observable<ApplicationSession>;
  private session: ApplicationSession;

  constructor(
    private http: HttpClient,
    private appStore: Store<ApplicationSession>,
    private netWorthStore: Store<NetWorthState>
  ) {
    this.session$ = this.appStore.select(selectApplicationSession);
    this.session$.subscribe((session: ApplicationSession) => {
      this.session = session;
    });
  }

  /* #region pathofexile.com */
  getStashTab(account: string = this.session.account, league: string = this.session.league, index: number): Observable<Stash> {
    const parameters = `?league=${league}&accountName=${account}&tabIndex=${index}&tabs=1`;
    return this.rateLimiter.limit(
      this.http.get<Stash>(this.poeUrl + '/character-window/get-stash-items' + parameters)
    );
  }

  getStashTabs(account: string = this.session.account, league: string = this.session.league) {
    const parameters = `?league=${league}&accountName=${account}&tabs=1`;
    return this.rateLimiter.limit(
      this.http.get<Stash>(this.poeUrl + '/character-window/get-stash-items' + parameters)
    );
  }

  getItemsForTabs(tabs: Tab[], account: string = this.session.account, league: string = this.session.league) {
    this.netWorthStore.dispatch(new netWorthActions.ResetFetchedTabsCount());
    return forkJoin(((AppConfig.production ? tabs : tabs.slice(0, 15)).map((tab: Tab) => {
      return this.getStashTab(account, league, tab.i).pipe(map((stash: Stash) => {
        this.netWorthStore.dispatch(new netWorthActions.IncrementFetchedTabsCount());
        const tabData = {
          league: league, items: stash.items.map((item: Item) => {
            return {
              id: item.id,
              name: ItemHelper.getItemName(item.typeLine, item.name),
              typeLine: item.typeLine,
              frameType: item.frameType,
              calculated: 0,
              elder: item.elder,
              shaper: item.shaper,
              icon: item.icon,
              ilvl: item.ilvl,
              tier: item.properties !== null && item.properties !== undefined ? ItemHelper.getMapTier(item.properties) : 0,
              corrupted: item.corrupted || false,
              links: item.sockets !== undefined && item.sockets !== null ? ItemHelper.getLinks(item.sockets.map(t => t.group)) : 0,
              sockets: item.sockets !== undefined && item.sockets !== null ? item.sockets.length : 0,
              quality: item.properties !== null && item.properties !== undefined ? ItemHelper.getQuality(item.properties) : 0,
              level: item.properties !== null && item.properties !== undefined ? ItemHelper.getQuality(item.properties) : 0,
              stackSize: item.stackSize || 1,
              totalStacksize: item.maxStackSize || 1,
              variant: item.sockets !== undefined && item.sockets !== null ? ItemHelper.getItemVariant(item.sockets, item.explicitMods) : ''
            } as PricedItem;
          })
        } as Tab;
        return { ...tab, ...tabData };
      }));
    })));
  }

  getLeagues(type: string = 'main', compact: number = 1): Observable<League[]> {
    const parameters = `?type=${type}&compact=${compact}`;
    return this.rateLimiter.limit(
      this.http.get<League[]>('https://api.pathofexile.com/leagues' + parameters));
  }

  getCharacters(account: string = this.session.account): Observable<Character[]> {
    const parameters = `?accountName=${account}`;
    return this.rateLimiter.limit(
      this.http.get<Character[]>(this.poeUrl + '/character-window/get-characters' + parameters));
  }

  /* #endregion */

  updateRatelimit(requestCount: number, milliseconds: number) {
    this.rateLimiter = RatelimitHelper.updateRatelimit(requestCount, milliseconds);
  }

}
