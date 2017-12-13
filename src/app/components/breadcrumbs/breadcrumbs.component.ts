import { Component } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent {
  breadcrumbs: IBreadcrumbs[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Credits to this amazing solution from "https://stackoverflow.com/questions/40863664/how-to-get-current-route-custom-data-in-angular-2"
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data["labels"]) {
            return child.snapshot;
          } else {
            return null;
          }
        }
        return null;
      })
      .subscribe(customData => {
        this.breadcrumbs = [];
        const labels: Array<string> = customData.data["labels"];
        const urls: Array<string> = customData.data["urls"];
        let bread: IBreadcrumbs;
        for (let i = 0; i < labels.length; i++) {
          bread = {
            label: labels[i],
            url: urls[i]
          };
          this.breadcrumbs.push(bread);
        }
        console.log(this.breadcrumbs);
      });
  }

  goBack() {
    if (this.breadcrumbs.length > 1) {
      // back one component
      const path = this.breadcrumbs[this.breadcrumbs.length - 2].url;
      this.router.navigate([path]);
    } else {
      // back to home
      this.router.navigate(['/']);
    }
  }
}

interface IBreadcrumbs {
  label: string;
  url: string;
}

