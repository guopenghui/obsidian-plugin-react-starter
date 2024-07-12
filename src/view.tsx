import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createRoot, Root } from "react-dom/client"

import type MyPlugin from "@/main"
import { Counter } from "@/Counter"

export const MY_VIEW: string = 'my-react-starter-view';

export class MyView extends ItemView {
  reactRoot: Root;
  plugin: MyPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return MY_VIEW;
  }

  getDisplayText(): string {
    return "My View";
  }

  getIcon(): string {
    return "bot";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    const mountPoint = container.createEl("div", {
      cls: "fiction-search",
      attr: {
        style: "height: 100%; width: 100%;"
      }
    });

    this.reactRoot = createRoot(mountPoint);
    this.reactRoot.render(
        <Counter/>
    )
  }

  async onClose() {
  }
  onunload(): void {
    this.reactRoot.unmount()
  }

}
